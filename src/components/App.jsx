import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Root, Main } from './styles'; // Import styled components
import { Actors, MovieInfo, Movies, Navbar, Profile } from './';

const App = () => {
  return (
    <Root>
      <CssBaseline />
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieInfo />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Main>
    </Root>
  );
};

export default App;
