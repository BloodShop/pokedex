import { configureStore } from '@reduxjs/toolkit';
import singlePokeReducer from '../features/pokemons/singlePokeSlice';
import pokedexReducer from '../features/pokemons/pokedexSlice';

export const store = configureStore({
  reducer: {
    pokemon: singlePokeReducer,
    pokedex: pokedexReducer
  },
});
