import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import { useGetActorsDetailsQuery } from '../../services/TMDB';
import { useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { Pagination, MovieList } from '..'
import useStyles from './styles'


const Actors = () => {
  const classes = useStyles()
  const { id } = useParams();
  const [ page, setPage ] = useState(1);
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies, isFetching: isMovies } = useGetMoviesByActorIdQuery({id, page});

  if(isFetching) {
        return (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size='7rem' />
          </Box>
        );
      }

        if(error) {
          return (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)} 
                color='primary'
                >Go Back
              </Button>
            </Box>
          );
        }        

  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 item lg={5} xl={4}>
          <img className={classes.image}
               src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
               alt={data.name}
               />
        </Grid2>
        <Grid2 item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flex: 1 }}>
          <Typography variant='h2' gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' align='justify' paragraph>
            {data?.biography || 'Sorry no biography yet'}
          </Typography>
          <Box margin='2rem' display='flex' justifyContent='space-around'>
            <Button variant='contained' color='primary' target='blank' href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Back</Button>
          </Box>
        </Grid2>
        <Box marginTop='2rem 0'>
            <Typography variant='h3' gutterBottom align='center'>Movies Featured In</Typography>
            {/* loop through the recomended movies */}
            {movies ? <MovieList movies={movies} numberOfMovies={15}/> : <Typography variant='h6'>Error fetching movies</Typography>}
            <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages}/>
          </Box>
      </Grid2>
    </>
  )
  
}

export default Actors;