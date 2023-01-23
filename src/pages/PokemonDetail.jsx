import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getPokemonById } from "../features/pokemons/pokedexSlice";
import NoMatch from "./NoMatch";

export default function PokemonDetail() {
    const { state } = useLocation(),
        params = useParams(),
        location = useLocation(),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        [pokemon, setPokemon] = useState(),
        [evolutionChain, setEvolutionChain] = useState([]);

    useEffect(() => {
        if (!state) {
            navigate(-1);
        } else if (state.pokemon) {
            setPokemon(state.pokemon);
        } else {
            dispatch(getPokemonById(params.id)).then((res) =>
                setPokemon(res.payload)
            );
        }
        console.log(state.evolutionChain);
        setEvolutionChain(state.evolutionChain);
    }, [state, dispatch, navigate]);

    if (!pokemon) {
        return <Spinner />;
    } else if (
        pokemon === `Pokemon ${params.id} not found` ||
        typeof pokemon === "string" ||
        pokemon instanceof String
    ) {
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
                <div className="pokemon-detail__evolutions">
                    <h3>Evolutions:</h3>
                    <ul>
                        {evolutionChain &&
                            evolutionChain.map((evolution, index) => {
                                if (Array.isArray(evolution)) {
                                    return;
                                }

                                return (
                                    <div key={evolution.id}>
                                        {index !== 0 && (
                                            <li>
                                                <span>&#8594;</span>
                                            </li>
                                        )}
                                        <li
                                            onClick={(e) => {
                                                location.pathname ===
                                                `/${evolution.id}`
                                                    ? e.preventDefault()
                                                    : navigate(
                                                          `/${evolution.id}`,
                                                          {
                                                              state: {
                                                                  evolutionChain:
                                                                      state.evolutionChain,
                                                              },
                                                          }
                                                      );
                                            }}
                                            className={`circle${
                                                evolution.id === pokemon.id
                                                    ? "__current"
                                                    : ""
                                            }`}
                                        >
                                            <div>{evolution.name}</div>
                                            <div>{index}</div>
                                        </li>
                                    </div>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
