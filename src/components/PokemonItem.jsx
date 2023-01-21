import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles.css";

export default function PokemonItem({ pokemon, onClick }) {
    const navigate = useNavigate();

    return (
        <div
            className="c-card p-1"
            onClick={onClick} /* onClick={() => navigate(`${pokemon.id}`)} */
        >
            <div className="c-card__title c-card--center">{pokemon.name}</div>
            <img src={pokemon.imageUrl} className="c-card__image" />
        </div>
    );
}
