import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getPokemonById } from "../features/pokemons/pokedexSlice";
import NoMatch from "./NoMatch";
import EvolutionChain from "../components/EvolutionChain";

export default function PokemonDetail() {
    const { state } = useLocation(),
        params = useParams(),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        [pokemon, setPokemon] = useState(),
        [evolutionChain, setEvolutionChain] = useState([]);

    useEffect(() => {
        if (!state) {
            navigate("/", { replace: true });
        } else if (state.pokemon) {
            setPokemon(state.pokemon);
        } else {
            dispatch(getPokemonById(params.id)).then((res) =>
                setPokemon(res.payload)
            );
        }

        setEvolutionChain(state?.evolutionChain);
    }, [state, params]);

    if (!pokemon) {
        return <Spinner />;
    } else if (typeof pokemon === "string") {
        return <NoMatch error={pokemon} />;
    }

    return (
        <div className="pokemon-detail">
            <div className="pokemon-detail__item">
                <h1 className="pokemon-detail__title">{pokemon.name}</h1>
                <LazyLoadImage
                    className="pokemon-detail__image"
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    effect="blur"
                />
                <p className="pokemon-detail__description">
                    {pokemon.description}
                </p>
                <div className="pokemon-detail__types">
                    <h3>Types:</h3>
                    <ul>
                        {pokemon.types.map((type) => (
                            <li key={type}>{type}</li>
                        ))}
                    </ul>
                </div>
                <div className="pokemon-detail__chain-container">
                    <h3>Evolutions:</h3>
                    <EvolutionChain chain={evolutionChain} pokemon={pokemon} />
                </div>
            </div>
        </div>
    );
}
