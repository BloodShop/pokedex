import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { useLocation } from "react-router-dom";
import Button from "./Button";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false),
        location = useLocation(),
        [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"header"}>
            <div className={"header__content"}>
                <div>
                    <span className={"logo"}>Pokédex</span>
                </div>
                <div>
                    <nav className={`nav ${menuOpen ? "nav--open" : {}}`}>
                        <a
                            className={`nav__item ${
                                location.pathname === "/"
                                    ? "nav__item--disabled"
                                    : ""
                            }`}
                            onClick={(e) =>
                                location.pathname === "/" && e.preventDefault()
                            }
                            href={"/"}
                        >
                            Inventory
                        </a>
                        <a
                            className={`nav__item ${
                                location.pathname === "/about"
                                    ? "nav__item--disabled"
                                    : ""
                            }`}
                            onClick={(e) =>
                                location.pathname === "/about" &&
                                e.preventDefault()
                            }
                            href={"about"}
                        >
                            Lazy About
                        </a>
                        <div className="nav__item">{time}</div>
                        <div className={"nav__button__container"}>
                            <Button />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
