import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pokedexService from './pokemonService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  pokemon: null,
}


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

export const singlePokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.pokemon = null
      },
    },
    extraReducers: (builder) => {
      builder
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

export const { reset } = singlePokemonSlice.actions;
export default singlePokemonSlice.reducer;