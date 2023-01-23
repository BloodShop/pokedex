import React from "react";
import { Link } from "react-router-dom";

export default function NoMatch({ error }) {
    return (
        <div className="error-detail">
            <div className="error-detail__item">
                <h1>{error}</h1>
                <h1>Eat Poke.. Don't play it.</h1>
                <p>Here are some helpful links:</p>
                <div>
                    <Link className="link" to={-1}>
                        Back
                    </Link>
                    <Link className="link" to={"/"}>
                        Pokedex
                    </Link>
                </div>
            </div>
        </div>
    );
}
