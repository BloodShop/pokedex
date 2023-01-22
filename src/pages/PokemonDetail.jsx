import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getPokemonById, reset } from "../features/pokemons/pokedexSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PokemonDetail() {
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

    return (
        <div className="pokemon-detail">
            <h1 className="pokemon-detail__title">{pokemon.name}</h1>
            <LazyLoadImage
                className="pokemon-detail__image"
                src={pokemon.imageUrl}
                alt={pokemon.name}
                effect="blur"
            />
            <p className="pokemon-detail__description">{pokemon.description}</p>
            <div className="pokemon-detail__types">
                <h3>Types:</h3>
                <ul>
                    {pokemon.types.map((type, index) => (
                        <li key={index}>{type}</li>
                    ))}
                </ul>
            </div>
            <div className="pokemon-detail__evolutions">
                <h3>Evolutions:</h3>
                <ul>
                    {pokemon.evolutions.map((evolution, index) => (
                        <li key={index}>{evolution.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
