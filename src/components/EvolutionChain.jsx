import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/styles.css";
import EvolutionItem from "./EvolutionItem";

export default function EvolutionChain({ chain, pokemon }) {
    const location = useLocation(),
        navigate = useNavigate();

    return (
        <div className="pokemon-detail__chain-container__wrapper">
            {chain?.map((evolution, index) => {
                if (Array.isArray(evolution)) {
                    return (
                        <>
                            {index !== 0 && <span>&#8594;</span>}
                            <div key={index} className="lvl">
                                {evolution.map((ev) => (
                                    <EvolutionItem
                                        key={ev.id}
                                        evolution={ev}
                                        index={index}
                                        selectedPokemon={pokemon}
                                        onClick={(e) => {
                                            location.pathname === `/${ev.id}`
                                                ? e.preventDefault()
                                                : navigate(`/${ev.id}`, {
                                                      state: {
                                                          evolutionChain: chain,
                                                      },
                                                      replace: true,
                                                  });
                                        }}
                                    />
                                ))}
                            </div>
                        </>
                    );
                }

                return (
                    <>
                        {index !== 0 && <span>&#8594;</span>}
                        <div key={index} className="lvl">
                            <EvolutionItem
                                key={evolution.id}
                                evolution={evolution}
                                index={index}
                                selectedPokemon={pokemon}
                                onClick={(e) => {
                                    location.pathname === `/${evolution.id}`
                                        ? e.preventDefault()
                                        : navigate(`/${evolution.id}`, {
                                              state: {
                                                  evolutionChain: chain,
                                              },
                                          });
                                }}
                            />
                        </div>
                    </>
                );
            })}
        </div>
    );

    return (
        <ul>
            {chain?.map((evolution, index) => {
                if (Array.isArray(evolution)) {
                    return (
                        <div className="multi-evolution">
                            {evolution.map((ev) => (
                                <div key={ev.id}>
                                    <li
                                        onClick={(e) => {
                                            location.pathname === `/${ev.id}`
                                                ? e.preventDefault()
                                                : navigate(`/${ev.id}`, {
                                                      state: {
                                                          evolutionChain: chain,
                                                      },
                                                  });
                                        }}
                                        className={`circle${
                                            ev.id === pokemon.id
                                                ? "__current"
                                                : ""
                                        }`}
                                    >
                                        <div>{ev.name}</div>
                                        <div>{index + 1}</div>
                                    </li>
                                </div>
                            ))}
                        </div>
                    );
                } else {
                    return (
                        <div key={evolution.id}>
                            {index !== 0 && (
                                <li>
                                    <span>&#8594;</span>
                                </li>
                            )}
                            <li
                                onClick={(e) => {
                                    location.pathname === `/${evolution.id}`
                                        ? e.preventDefault()
                                        : navigate(`/${evolution.id}`, {
                                              state: {
                                                  evolutionChain: chain,
                                              },
                                          });
                                }}
                                className={`circle${
                                    evolution.id === pokemon.id
                                        ? "__current"
                                        : ""
                                }`}
                            >
                                <div>{evolution.name}</div>
                                <div>{index + 1}</div>
                            </li>
                        </div>
                    );
                }
            })}
        </ul>
    );
}
