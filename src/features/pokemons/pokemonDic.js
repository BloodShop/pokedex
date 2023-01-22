function addEvolutions(pokemonList) {
    const evolutionArrays = []

    const getEvolutionChain = (pokemon, evolutionChain = []) => {
        evolutionChain.push(pokemon);
        if (pokemon?.evolutions.length === 0) {
            return evolutionChain;
        }
        for (let i = 0; i < pokemon?.evolutions.length; i++) {
            const nextPokemon = pokemonList.find(p => p.id === pokemon.evolutions[i].id);
            getEvolutionChain(nextPokemon, evolutionChain);
        }
        return evolutionChain;
    }

    for (let poke of pokemonList) {
        console.log(poke);

        evolutionArrays.push(getEvolutionChain(poke));
    }

    console.log(evolutionArrays);
    debugger
}


 function createEvolutionChains(pokemonList) {
    let evolutionChains = [];

    function findChain(pokemon, chain = []) {
        debugger
        chain.push(pokemon);
        if (!pokemon.evolutions?.length === 0) {
            evolutionChains.push(chain);
        } else {
            pokemon.evolutions?.forEach(evolution => findChain(pokemonList[evolution.id], [...chain]));
        }
    }

    pokemonList.forEach(pokemon => findChain(pokemon));
    debugger
    return evolutionChains;
}


const pokemonDictionary = (pokemons) => {
    let evolutionDictionary = {};

    pokemons.forEach((pokemon, index) => {
        evolutionDictionary[pokemon.id] = [{ ...pokemon }];
        if (pokemon.evolutions) {
            evolutionDictionary[pokemon.id].push();
            const tempArr = []
            pokemon.evolutions.forEach(evolution => {
                const temp = { ...pokemons.find(p => p.id === evolution.id) };
                if (!temp) {
                    temp = { [evolution.id]: evolution.name }
                }
                tempArr.push(temp);
            });
            if (tempArr.length > 0)
                evolutionDictionary[pokemon.id].push(tempArr);
        }
    });
    console.log(evolutionDictionary);
    debugger

    let evolutionArrays = createEvolutionsArray(evolutionDictionary);
    console.log(evolutionArrays);

    return evolutionArrays;
}

function createEvolutionsArray(evolutionDictionary) {
    let evolutionsArray = [], hash = {};

    function dfs(id, name, path) {
        if (hash[id]) {
            return;
        } else hash[id] = name;

        path.push({ [id]: name });
        if (!evolutionDictionary[id]) {
            evolutionsArray.push(path);
            return;
        }
        for (let i = 1; i < evolutionDictionary[id].length; i++) {
            dfs(Object.keys(evolutionDictionary[id][i])[0], evolutionDictionary[id][i][Object.keys(evolutionDictionary[id][i])[0]], path.slice());
        }
    }
    for (const [pokemonId, value] of Object.entries(evolutionDictionary)) {
        dfs(pokemonId, value[0].name, []);
    }
    return evolutionsArray;
}

export default pokemonDictionary;