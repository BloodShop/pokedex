import React, { useState } from "react";
import "../css/styles.css";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuToggler = () => setMenuOpen((p) => !p);

    return (
        <div className={"header"}>
            <div className={"header__content"}>
                <div>
                    <span className={"logo"}>Pokédex</span>
                </div>
                <div>
                    <nav className={`nav ${menuOpen ? "nav--open" : {}}`}>
                        <a className={"nav__item"} href={"/"}>
                            Inventory
                        </a>
                        <a className={"nav__item"} href={"about"}>
                            Lazy About
                        </a>
                        <div className={"nav__button__container"}>
                            <Button />
                        </div>
                    </nav>
                </div>
                <div>
                    <div className={"header__button__container"}>
                        <Button />
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
};

const Button = () => {
    return <button className={"button"}>Click me</button>;
};

export default Header;
