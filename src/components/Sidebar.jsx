import React, { useState } from "react";
import "../css/styles.css";

export default function Sidebar({ setQuery }) {
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
                {/* <div>
                    <span className="">Pokédex</span>
                </div>
                <div>
                    <nav
                        className={`${styles.nav} ${
                            menuOpen ? styles[`nav--open`] : {}
                        }`}
                    >
                        <a className={styles.nav__item} href={"/"}>
                            Inventory
                        </a>
                        <a className={styles.nav__item} href={"about"}>
                            Lazy About
                        </a>
                        <div className={styles.nav__button__container}>
                            <Button />
                        </div>
                    </nav>
                </div>
                <div>
                    <div className={styles.header__button__container}>
                        <Button />
                    </div>
                    <button
                        className={styles.header__toggler}
                        onClick={menuToggler}
                    >
                        {!menuOpen ? (
                            <BiMenuAltRight />
                        ) : (
                            <AiOutlineCloseSquare />
                        )}
                    </button>
                </div> */}
            </div>
        </div>
    );
}
