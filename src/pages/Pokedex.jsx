import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/spinner/Spinner";
import { getPokemons, reset } from "../features/pokemons/pokedexSlice";

export default function Pokedex() {
    const { pokemons, isLoading, isError, message } = useSelector(
            (state) => state.Pokedex
        ),
        dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getPokemons());

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    console.log(pokemons);

    return <div>Pokedex</div>;
}
