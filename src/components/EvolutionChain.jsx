import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/css/main.css";
import EvolutionItem from "./EvolutionItem";

export default function EvolutionChain({ chain, pokemon }) {
    const location = useLocation(),
        navigate = useNavigate();

    return (
        <div className="pokemon-detail__chain-container__wrapper">
            {chain?.map((evolution, index) => (
                <React.Fragment key={index}>
                    {Array.isArray(evolution) ? (
                        <>
                            {index !== 0 && <span>&#8594;</span>}
                            <div className="lvl">
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
                    ) : (
                        <>
                            {index !== 0 && <span>&#8594;</span>}
                            <div className="lvl">
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
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
