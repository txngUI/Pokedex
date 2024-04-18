import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreationUser from './components/CreationUser';
import Pokedex from './components/Pokedex';
import Pokemons from './components/Pokemons';
import Pokemon from './components/Pokemon';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/creationUser" element={<CreationUser />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="*" element={<Login />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;