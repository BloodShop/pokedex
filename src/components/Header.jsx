import React, { useState } from "react";
import "../css/styles.css";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <div className={"header"}>
            <div className={"header__content"}>
                <div>
                    <span className={"logo"}>Pokédex</span>
                </div>
                <div>
                    <nav className={`nav nav--open`}>
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
                            <Button />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Button = () => {
    return <button className={"button"}>Click me</button>;
};

export default Header;
