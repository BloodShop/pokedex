import React, { Component } from "react";

export default function Checkbox({ id, title, name, handleChange, checked }) {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    name={name}
                    onChange={handleChange}
                    checked={checked}
                />
                {title}
            </label>
        </div>
    );
}
