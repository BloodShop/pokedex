import axios from 'axios';

/* Proxy set on peckage.json */
const API_URL = 'https://uxzlr2g7f7g5x264n2fbpfqfjm0njdrw.lambda-url.us-east-1.on.aws/';

// Get pokemons
const getPokemons = async () => {
  const response = await axios.get(API_URL);

  return response.data;
}

// Get pokemon by Id
const getPokemonById = async (id) => {
  const response = await axios.get(API_URL+id);

  return response.data;
}

const pokedexService = {
    getPokemons,
    getPokemonById
}

export default pokedexService;