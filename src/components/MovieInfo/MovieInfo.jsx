import React from 'react';
import { Typography, Button, Box, CircularProgress, Grid2, ButtonGroup, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Language, FavoriteBorderOutlined, ArrowBack, Theaters, PlusOne, Favorite, Remove } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentDenreOrCategory';

import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';

const MovieInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();

  const isMovieFavorited = false;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {

  };

  const addToWatchlist = () => {

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
      <Grid2 item container direction='column' lg={7} className={classes.content}>
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
            {data?.runtime}min { data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : '' }
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
                <Button onClick={() => {}} href='#' endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid2>
            <Grid2 item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavourite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne /> }>
                  {isMovieWatchlisted ? 'Remove Frome WatchList' : 'WatchList'}
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                <Typography style={{textDecoration: 'none'}} component={Link} to='/' color='primary' >Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid2>
          </div>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default MovieInfo;