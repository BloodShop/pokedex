import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonItem from "../components/PokemonItem";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { getPokemons, reset } from "../features/pokemons/pokedexSlice";
import revolutionary from "../features/pokemons/revolutionary";
import pokemonTypes from "../features/pokemons/pokemonTypes";
import pokemonFilter from "../features/pokemons/pokemonFilter";
import NoMatch from "./NoMatch";

/* Pokedex inventory */
export default function Pokedex() {
    const dispatch = useDispatch(),
        { pokemons, isLoading, isError, message } = useSelector(
            (state) => state.pokedex
        ),
        [query, setQuery] = useState(""),
        navigate = useNavigate(),
        [selectedPokemon, setSelectedPokemon] = useState(),
        [types, setTypes] = useState(
            pokemonTypes.reduce((acc, type) => ({ ...acc, [type]: false }), {})
        ),
        [pokemonGraphEvolution, setPokemonGraphEvolution] = useState(null);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (selectedPokemon) {
            navigate(`${selectedPokemon.id}`, {
                state: {
                    pokemon: selectedPokemon,
                    evolutionChain: pokemonGraphEvolution.find((ev) =>
                        ev.some((obj) => {
                            if (obj.id) {
                                return obj.id === selectedPokemon.id;
                            }
                            return obj.some(
                                (nestedEv) => nestedEv.id === selectedPokemon.id
                            );
                        })
                    ),
                },
            });
        }

        dispatch(getPokemons()).then((res) => {
            setPokemonGraphEvolution(revolutionary(res.payload));
        });

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

    return isLoading ? (
        <Spinner />
    ) : isError ? (
        <NoMatch />
    ) : (
        <>
            <div className="main__intro">
                <Sidebar onTypeCheck={handleTypeChange} setQuery={setQuery} />
                <div className={"card-container"}>
                    {pokemons.length > 0 ? (
                        pokemonFilter(pokemons, types, query).map((pokemon) => (
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
