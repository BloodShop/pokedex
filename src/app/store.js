import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from '../features/pokemons/pokedexSlice';

export const store = configureStore({
  reducer: {
    pokedex: pokedexReducer
  },
});
