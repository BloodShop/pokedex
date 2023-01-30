// Creating the pokemonTypes - from getting all of the pokemons, and then set will avoid type duplicates and arrange it again to an array

import pokedexService from "./pokemonService";

(async () => {
    debugger
    const pokemons = await pokedexService.getPokemons();
    const types = pokemons.reduce((acc, poke) => {
        acc.concat(poke.types);
        return acc;
    }, [])
    return [...new Set(types)]
})();

const pokemonTypes = ['grass','fire','flying','water','bug','normal','electric','ground','fairy','fighting','psychic','rock','steel','ice','ghost','dragon'];
export default pokemonTypes;