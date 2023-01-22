import React from "react";
import "../css/styles.css";
import pokemonTypes from "../features/pokemons/pokemonTypes";

export default function Sidebar({ onTypeCheck, setQuery }) {
    return (
        <div className="sidebar">
            <div className="sidebar__content">
                <label>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </label>
                <div className="">
                    {pokemonTypes &&
                        pokemonTypes.map((type, index) => (
                            <div className="sidebar__content__type" key={type}>
                                <label>
                                    <input
                                        name={type}
                                        type="checkbox"
                                        onChange={onTypeCheck}
                                    />
                                    {type}
                                </label>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
