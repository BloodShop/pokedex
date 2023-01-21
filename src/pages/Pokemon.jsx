import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getPokemonById, reset } from "../features/pokemons/singlePokeSlice";

export default function Pokemon() {
    const { id } = useParams(),
        { state } = useLocation(),
        dispatch = useDispatch(),
        [pokemon, setPokemon] = useState();
    /* { pokemon, isLoading, isError, message } = useSelector(
            (state) => state.pokemon
        ); */

    useEffect(
        () => {
            /* if (isError) {
            console.log(message);
        } */

            setPokemon(state.pokemon);
            // dispatch(getPokemonById(id));

            /* return () => {
            dispatch(reset());
        }; */
        },
        [
            /* isError, message, dispatch */
        ]
    );

    if (!pokemon) {
        return <Spinner />;
    }
    console.log(pokemon);

    return <div>{pokemon.id}</div>;
}
