import React from 'react';
import { Typography, Grid2 } from '@mui/material';
import useStyles from './styles';

const Movie = ({ movie, i }) => {  // Correct destructuring
    const classes = useStyles();

    return (
        <Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
            <Typography className={classes.title} variant="h5">{movie.title}</Typography> {/* Use className instead of classes */}
        </Grid2>
    );
};

export default Movie;
