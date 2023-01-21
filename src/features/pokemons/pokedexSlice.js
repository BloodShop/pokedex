import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pokedexService from './pokemonService';

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    pokemons: [],
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
    },
  })

  export const { reset } = pokedexSlice.actions;
  export default pokedexSlice.reducer;