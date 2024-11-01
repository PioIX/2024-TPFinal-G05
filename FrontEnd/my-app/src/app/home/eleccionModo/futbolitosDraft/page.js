// components/FutbolitosDraft.js
"use client"
import { useState } from "react";
import styles from "./page.module.css";

export default function FutbolitosDraft() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            {isVisible && (
                <div>aaaaaaaaaaa</div>
            )}
            <div className={`${styles.container} ${isVisible ? styles.show : ''}`}>
                <div className={styles.dropdownContent}>
                    <p>Contenido del desplegable</p>
                </div>
                <button onClick={toggleDropdown} className={styles.button}>-</button>
            </div>
        </div>
    );
}
