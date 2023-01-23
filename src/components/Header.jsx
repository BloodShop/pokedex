import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Clock from "./Clock";
import "../css/styles.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false),
        menuToggler = () => setMenuOpen((p) => !p),
        location = useLocation();

    return (
        <div className={"header"}>
            <div className={"header__content"}>
                <div>
                    <a
                        className={"logo"}
                        onClick={(e) =>
                            location.pathname === "/" && e.preventDefault()
                        }
                        href={"/"}
                    >
                        Pokédex
                    </a>
                </div>
                <div>
                    <nav className={`nav ${menuOpen ? "nav--open" : {}}`}>
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
