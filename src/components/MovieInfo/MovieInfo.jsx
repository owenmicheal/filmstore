import React, { useEffect, useState } from 'react';
import { Typography, Button, Box, CircularProgress, Grid2, ButtonGroup, useMediaQuery, Rating, Modal } from '@mui/material';
import { Movie as MovieIcon, Language, FavoriteBorderOutlined, ArrowBack, Theaters, PlusOne, Favorite, Remove } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentDenreOrCategory';

import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { MovieList } from '..';
import { userSelector } from '../../features/auth';

const MovieInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const classes = useStyles();
  const [ open, setOpen ] = useState(false);
  
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations, isFetching: isRecommendations } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id});

  const [ isMovieFavorited, setisMovieFavorited ] = useState(false);
  const [ isMovieWatchlisted, setisMovieWatchlisted ] = useState(false);
  
  useEffect(() => {
    setisMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setisMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setisMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setisMovieWatchlisted((prev) => !prev);
  };

  if(isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' >
        <CircularProgress size='8rem' />
      </Box>
    );
  };

  if(error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' >
        <Link to='/'>Waliwo ekikyamu! Dayo Emabega</Link>
      </Box>
    );
  };
  
  return (
    <Grid2 container className={classes.containerSpaceAround}>
      <Grid2 item sm={12} lg={4}>
        <img 
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid2>
      <Grid2 item container direction='column' lg={7}>
        <Typography variant='h4' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h6' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid2 item className={classes.containerSpaceAround}>
          <Box display='flex' align='center'>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant='subtitle1' gutterBottom style={{marginLeft: '10px'}}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid2>
        <Grid2 item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link key={genre.name} className={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} className={ classes.genreImage } height={30} />
              <Typography variant='subtitle1' color='textPrimary'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid2>
        <Typography variant='h5' gutterBottom style={{marginTop: '10px'}}>
          overview
        </Typography>
        <Typography style={{marginBottom: '2rem'}}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>
        <Grid2 item container spacing={2}>
          {data && data?.credits?.cast.map((character, i) => (
            character.profile_path && (<Grid2 key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name}/>
              <Typography className={classes.castName}>
                {character?.name.split(' ')[0]} {/* First Name */}
              </Typography>
              <Typography className={classes.castName}>
                {character?.name.split(' ')[1] || ''} {/* Last Name (if exists) */}
              </Typography>
              <Typography color='textSecondary'>
                {character.character.split(' ')[0]}
              </Typography>
            </Grid2>)
          )).slice(0, 6)}
        </Grid2>
        <Grid2 item container style={{marginTop: '2rem' }}>
          <div className={classes.buttonContainer}>
            <Grid2 item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button target='blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target='blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href='#' endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid2>
            <Grid2 item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavourite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne /> }>
                  {isMovieWatchlisted ? 'WatchList' : 'WatchList'}
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                <Typography style={{textDecoration: 'none'}} component={Link} to='/' color='primary' >Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid2>
          </div>
        </Grid2>
      </Grid2>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>You Might Also Like</Typography>
        {/* loop through the recomended movies */}
          {recommendations ? <MovieList movies={recommendations} numberOfMovies={15}/> : <Typography variant='h6'>Tetulina Recomendations zeeno movie</Typography>}
      </Box>
        <Modal 
          closeAfterTransition
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}>
            {data?.videos?.results?.length > 0 ? (
              <iframe
                autoPlay
                className={classes.video}
                style={{border: 'none'}}
                title='Trailer'
                src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                allow='autoplay'
              />
            ) : (
              <Typography>No Trailer for this movie</Typography>
            )}
        </Modal>
    </Grid2>
  )
}

export default MovieInfo;