import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Spinner from './components/spinner/Spinner';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
const LazyAbout = React.lazy(() => import('./pages/About'));

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Pokedex />} />
        <Route path='/:id' element={<Pokemon />} />

        <Route path='about'
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyAbout />
              </React.Suspense>
            } />
      </Routes>
    </div>
  );
}
