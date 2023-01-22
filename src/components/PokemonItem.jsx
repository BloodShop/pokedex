import React from "react";
import "../css/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PokemonItem({ pokemon, onClick }) {
    return (
        <div className="c-card p-1" onClick={onClick}>
            <div className="c-card__title c-card__center">{pokemon.name}</div>
            <LazyLoadImage
                src={pokemon.imageUrl}
                alt={pokemon.name}
                className="c-card__image"
                effect="blur"
            />
        </div>
    );
}
