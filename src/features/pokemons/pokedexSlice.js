import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pokedexService from './pokemonService';

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    pokemons: [],
    pokemon: null
}

export const getPokemons = createAsyncThunk(
    'pokemons/get',
    async (_, thunkAPI) => {
        try {
            return await pokedexService.getPokemons();
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get pokemon by id
export const getPokemonById = createAsyncThunk(
  'pokemons/getById',
  async (id, thunkAPI) => {
      try {
          return await pokedexService.getPokemonById(id);
      } catch (error) {
          const message =
              (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString();
          return thunkAPI.rejectWithValue(message);
      }
  }
);

export const pokedexSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.pokemons = []
        state.pokemon = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPokemons.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getPokemons.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.pokemons = action.payload
        })
        .addCase(getPokemons.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getPokemonById.pending, (state) => {
          if(!state.isLoading)
            state.isLoading = true
        })
        .addCase(getPokemonById.fulfilled, (state, action) => {
          if(state.isLoading)
            state.isLoading = false
          state.isSuccess = true
          state.pokemon = action.payload
        })
        .addCase(getPokemonById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })

  export const { reset } = pokedexSlice.actions;
  export default pokedexSlice.reducer;