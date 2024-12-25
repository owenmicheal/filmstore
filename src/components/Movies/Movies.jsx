import React, { useState, useEffect} from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentDenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';




const Movies = () => {
    const [ page, setPage ] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    const isLg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
    const isXl = useMediaQuery((theme) => theme.breakpoints.only('xl'));

  // Determine number of movies based on screen size
    const numberOfMovies = isXl ? 24 : isLg ? 20 : 16;

    if(isFetching) {
      return (
        <Box display='flex' justifyContent='center'>
          <CircularProgress size='4rem' />
        </Box>
      );
    }

    if(!data.results.length) {
      return (
        <Box display='flex' alignItems='center' mt='20px'>
          <Typography variant='h4'>
            Tewali Movie eyo joyagala.
            <br />
            Please search for something else.
            </Typography>      
        </Box>
      );
    }

    if(error) return 'An error has occured'


  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  )
};

export default Movies;