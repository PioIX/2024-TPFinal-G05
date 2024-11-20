"use client";
import clsx from "clsx";
import styles from "./CartaVacia.module.css";
import { useEffect, useState } from "react";

export default function CartaVacia({
    media,
    PlayerId,
    posicion,
    nacionalidad,
    imagenJugador,
    escudo,
    nombreJugador,
    ataque,
    control,
    defensa,
    isSmall = false, // Nueva prop para la variante
    onClick,
    className,
    jugadorActivo
}) {
    const mediaGRL = Math.round(((ataque + control + defensa) / 3) + 7);
    const [active, setActive ] = useState(false)

    useEffect(()=>{
        // console.log("Dentro de la carta: ", {jugadorActivo}, {PlayerId})

        if (PlayerId == jugadorActivo) {
            setActive(true)
        } 
        // else {
        //     setActive(false)
        // }
        
    }, [jugadorActivo])
    return (
        <div className={styles.carta} onClick={onClick}>

        </div>
    );
}