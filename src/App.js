import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail';

export default function App() {
  const [previousPath, setPreviousPath] = useState(null);

  useEffect(() => {
      if (previousPath === window.location.pathname) {
          return;
      }
      setPreviousPath(window.location.pathname);
  }, [previousPath]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={<Pokedex />} />
        <Route path='/:id' exact element={<PokemonDetail />} />

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}
