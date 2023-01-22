import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { useLocation } from "react-router-dom";
import Clock from "./Clock";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false),
        menuToggler = () => setMenuOpen((p) => !p),
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
                        <div className={"nav__button__container"}>
                            <Clock />
                        </div>
                    </nav>
                </div>
                <div>
                    <div className={"header__button__container"}>
                        <Clock />
                    </div>
                    <button className={"header__toggler"} onClick={menuToggler}>
                        {!menuOpen ? (
                            <BiMenuAltRight />
                        ) : (
                            <AiOutlineCloseSquare />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
