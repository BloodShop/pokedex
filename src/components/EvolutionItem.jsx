import React from "react";

export default function EvolutionItem({
    evolution,
    index,
    onClick,
    selectedPokemon,
}) {
    return (
        <div
            className={`circle${
                evolution.id === selectedPokemon.id ? "__current" : ""
            }`}
            onClick={onClick}
        >
            <div className="content">
                <h4>{evolution.name}</h4>
                <div>{index + 1}</div>
            </div>
        </div>
    );
}
