"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function FutbolitosDraft() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(true); // Estado para controlar el contenido de la página

    const toggleDropdown = () => {
        setIsContentVisible(false); // Oculta el contenido de la página
        setIsDropdownVisible(true); // Muestra el div
    };

    return (
        <div>
            {isContentVisible && (
                <div>
                    <h1>Contenido de la página</h1>
                    <button onClick={toggleDropdown} className={styles.button}>Mostrar Div</button>
                </div>
            )}
            {isDropdownVisible && (
                <div>
                    <h2>Div Visible</h2>
                    <p>Contenido del div mostrado.</p>
                    <button onClick={() => setIsDropdownVisible(false)} className={styles.button}>Ocultar Div</button>
                </div>
            )}
        </div>
    );
}