import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NoMatch({ error }) {
    const navigate = useNavigate();

    return (
        <div className="error-detail">
            <div className="error-detail__item">
                <h1>{error}</h1>
                <p>Here are some helpful links:</p>
                <div>
                    <button onClick={() => navigate(-1, null)} className="link">
                        Back
                    </button>
                    <Link className="link" to="/">
                        Pokedex
                    </Link>
                </div>
            </div>
        </div>
    );
}
