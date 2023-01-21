import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { getPokemonById, reset } from "../features/pokemons/singlePokeSlice";

export default function Pokemon() {
    const { id } = useParams(),
        dispatch = useDispatch(),
        { pokemon, isLoading, isError, message } = useSelector(
            (state) => state.pokemon
        );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getPokemonById(id));

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    console.log(pokemon);

    return <div>Pokemon</div>;
}
