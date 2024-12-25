import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';


const Profile = () => {
    // Access profile data from Redux state
    const { user } = useSelector(userSelector);

    const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
    const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

    useEffect(() => {
      refetchFavorites()
      refetchWatchlist()
    }, []);

    const logout = () => {
      localStorage.clear()

      window.location.href = '/';
    };

    return (
      <Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h4' gutterBottom>My Profile</Typography>
            <Button
                color="error"
                variant="contained"
                onClick={logout}
                startIcon={<ExitToApp />}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  padding: { xs: '0.4rem 0.8rem', sm: '0.6rem 1.2rem' },
                  minWidth: { xs: 'auto', sm: '120px' },
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Logout
                </Box>
            </Button>

        </Box>
        {!favoriteMovies?.results?.length && watchlistMovies?.results?.length ? (<Typography variant='h5' >
          Add Favourites or Watchlist some movies to add them here
        </Typography>) : (<Box>
          <RatedCards title='Favorite Movies' data={favoriteMovies} />
          <RatedCards title='Watchlist' data={watchlistMovies} />
        </Box>)}
      </Box>
    )
};

export default Profile;
