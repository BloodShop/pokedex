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
            <div className="c-card__description">
                {pokemon.description.substring(0, 100)}...
            </div>
            <div className="c-card__types">
                <h3>Types:</h3>
                <ul>
                    {pokemon.types.map((type, index) => (
                        <li key={index}>{type}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
