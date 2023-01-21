import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PokemonItem from "../components/PokemonItem";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { getPokemons, reset } from "../features/pokemons/pokedexSlice";

export default function Pokedex() {
    const dispatch = useDispatch(),
        { isLoading, isError, message, pokemons } = useSelector(
            (state) => state.pokedex
        ),
        [query, setQuery] = useState(""),
        location = useLocation(),
        navigate = useNavigate(),
        [selectedPokemon, setSelectedPokemon] = useState();

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
        };
    }, [selectedPokemon, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="main">
                <Sidebar setQuery={setQuery} />
                <div className={"card-container"}>
                    {pokemons.length > 0 ? (
                        pokemons
                            .filter((pokemon) =>
                                query === ""
                                    ? pokemon
                                    : pokemon.name
                                          .toLowerCase()
                                          .includes(query.toLowerCase())
                                    ? pokemon
                                    : ""
                            )
                            .map((pokemon) => (
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
            {selectedPokemon && <Outlet key={location.pathname} />}
        </>
    );
}
