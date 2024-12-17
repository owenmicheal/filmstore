import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Actors, MovieInfo, Movies, Navbar, Profile } from './';

import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  return (
    <div className={ classes.root }>
      <CssBaseline />
      <Navbar />
      <main className={ classes.content } >
        <div className={ classes.toolbar } />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
