import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail';
const LazyAbout = React.lazy(() => import('./pages/About'));

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

        <Route path='about' exact
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyAbout />
              </React.Suspense>
            } />
      </Routes>
    </div>
  );
}
