
export default function filterPokemons(pokemons, types, query) {
    const filterByQuery = (pokes) => {
        return pokes.filter((pokemon) =>
            query === ""
                ? pokemon
                : pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filterByType = (pokes) => {
        const checkedTypes = Object.entries(types)
            .filter((type) => type[1])
            .map((type) => type[0]);
        return checkedTypes.length > 0
            ? pokes.filter(({ types }) =>
                  types.some((t) => checkedTypes.includes(t))
              )
            : pokes;
    };

    return filterByType(filterByQuery(pokemons));
}