export default function revolutionary(pokemonList) {
    const pokemonsCopy = structuredClone(pokemonList), evolution = [];
    for(let i = 0; i < pokemonsCopy.length; i++) {
        pokemonsCopy[i].evolutions = pokemonsCopy[i].evolutions.map(e => {
            const pokeIndex = pokemonsCopy.findIndex(p => p.id === e.id);
            if (pokeIndex !== -1) {
                pokemonsCopy[pokeIndex].devolution = pokemonsCopy[i];
                return pokemonsCopy[pokeIndex];
            }
            return { ...e, devolution: pokemonsCopy[i] };
        })
    }

    const filteredPokes = pokemonsCopy.filter(p => !p.devolution);
    for (let i = 0; i < filteredPokes.length; i++) {
        const tempChain = [filteredPokes[i]];
        let tempEvolutions = filteredPokes[i].evolutions;
        while (tempEvolutions && tempEvolutions.length > 0) {
            if(tempEvolutions.length === 1) {
                tempChain.push(structuredClone(tempEvolutions[0]));
            } else {
                tempChain.push(structuredClone(tempEvolutions));
            }
            tempEvolutions = tempEvolutions.find(e => e.evolutions)?.evolutions;
        }
        evolution.push(tempChain);
    }

    console.log('!!', evolution);

    return evolution
}
