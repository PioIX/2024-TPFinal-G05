"use client";

import { useState } from "react";
import styles from "./Paquete.module.css";

export default function Paquete() {
    const [abrio, setAbrio] = useState(true);

    return (
        <div>
            {abrio ? (
                <div className={styles.Sobre} onClick={() => setAbrio(false)}>ssss</div>
            ) : (
                <div className={styles.ConjuntoCartas}>aaaaa</div>
            )}
        </div>
    );
}