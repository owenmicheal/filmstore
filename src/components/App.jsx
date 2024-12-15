import React from 'react';
import { CssBaseline } from '@mui/material'; // Import CssBaseline
import { Routes, Route } from 'react-router-dom'; // No need to import BrowserRouter here

import { Actors, MovieInfo, Movies, Navbar, Profile } from './';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />  {/* Render Navbar globally */}
      <main>
        <Routes>
          <Route path="/" element={<Movies />} /> 
          <Route path="/movies/:id" element={<MovieInfo />} />  
          <Route path="/actors/:id" element={<Actors />} />  
          <Route path="/profile/:id" element={<Profile />} />  
        </Routes>
      </main>
    </>
  );
};

export default App;
