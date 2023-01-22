import React from "react";
import { Link } from "react-router-dom";

export default function NoMatch({ error }) {
    return (
        <div className="error-detail">
            <div className="error-detail__item">
                <h1>{error}</h1>
                <p>Here are some helpful links:</p>
                <div>
                    <Link className="link" to="/">
                        Pokedex
                    </Link>
                    <Link className="link" to="/about">
                        About
                    </Link>
                </div>
            </div>
        </div>
    );
}
