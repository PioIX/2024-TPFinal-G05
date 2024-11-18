"use client";
import styles from "./button.module.css";
import clsx from "clsx";

export default function Button({ text, onClick, variant, disabled }) {
    return (
        <button
            className={clsx(styles.button, {
                [styles.jugar]: variant === "jugar",
                [styles.normal]: variant === "normal",
                [styles.nav]: variant === "nav",
                [styles.navJuego]: variant === "navJuego",
            })}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
