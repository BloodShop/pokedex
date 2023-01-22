const pokemonDictionary = (pokemons) => {
    let evolutionDictionary = {};

    pokemons.forEach(pokemon => {
        evolutionDictionary[pokemon.id] = [{ name: pokemon.name }];
        if (pokemon.evolutions) {
            evolutionDictionary[pokemon.id].push();
            pokemon.evolutions.forEach(evolution => {
                evolutionDictionary[pokemon.id].push({ [evolution.id]: evolution.name });
            });
        }
    });
    console.log(evolutionDictionary);


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