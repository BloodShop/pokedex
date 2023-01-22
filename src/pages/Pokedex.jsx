import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PokemonItem from "../components/PokemonItem";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { getPokemons, reset } from "../features/pokemons/pokedexSlice";
import pokemonTypes from "../features/pokemons/pokemonTypes";

export default function Pokedex() {
    const dispatch = useDispatch(),
        { isLoading, isError, message, pokemons } = useSelector(
            (state) => state.pokedex
        ),
        [query, setQuery] = useState(""),
        location = useLocation(),
        navigate = useNavigate(),
        [selectedPokemon, setSelectedPokemon] = useState(),
        [types, setTypes] = useState(
            pokemonTypes.reduce((acc, type) => ({ ...acc, [type]: false }), {})
        );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (selectedPokemon) {
            navigate(`${selectedPokemon.id}`, {
                state: { pokemon: selectedPokemon },
            });
        }

        dispatch(getPokemons());

        return () => {
            dispatch(reset());
            clearInterval(selectedPokemon);
        };
    }, [selectedPokemon, isError, message, dispatch]);

    const handleTypeChange = (e) => {
        const { name } = e.target;
        setTypes((prevTypes) => {
            return { ...prevTypes, [name]: !prevTypes[name] };
        });
    };

    const filterByQuery = (pokes) => {
        return pokes.filter((pokemon) =>
            query === ""
                ? pokemon
                : pokemon.name.toLowerCase().includes(query.toLowerCase())
                ? pokemon
                : ""
        );
    };

    const filterByType = (pokes) => {
        const checkedTypes = Object.entries(types)
            .filter((type) => type[1])
            .map((type) => type[0]);
        if (checkedTypes.length > 0) {
            return pokes.filter(({ types }) =>
                types.some((t) => checkedTypes.includes(t))
            );
        }
        return pokes;
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div>
                <Sidebar onTypeCheck={handleTypeChange} setQuery={setQuery} />
                <div className={"card-container"}>
                    {pokemons.length > 0 ? (
                        filterByType(filterByQuery(pokemons)).map((pokemon) => (
                            <PokemonItem
                                onClick={() => setSelectedPokemon(pokemon)}
                                key={pokemon.id}
                                pokemon={pokemon}
                            />
                        ))
                    ) : (
                        <h3>You have no pokemons</h3>
                    )}
                </div>
            </div>
        </>
    );
}
