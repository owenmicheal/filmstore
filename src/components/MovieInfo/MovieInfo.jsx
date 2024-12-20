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
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h3' align='center' gutterBottom>
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
      </Grid2>
    </Grid2>
  )
}

export default MovieInfo;