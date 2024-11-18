"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./Card.module.css";

export default function Card({
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
    isSmall = false, // Prop para ajustar el tamaño de la carta
    onClick,
    className,
    jugadorActivo // Indica si la carta está activa
}) {
    const mediaGRL = Math.round(((ataque + control + defensa) / 3) + 7); // Calcula la media de estadísticas del jugador
    const [active, setActive] = useState(false); // Controla si la carta está activa

    useEffect(() => {
        setActive(jugadorActivo); // Si está activo, marca la carta como activa
    }, [jugadorActivo]);

    return (
        <div
            className={clsx(
                styles.carta, // Clase principal de la carta
                { [styles.cartaSmall]: isSmall }, // Si es pequeña, aplica estilo pequeño
                { [styles.activa]: active }, // Si está activa, aplica estilo activo
                className // Otras clases que pueda recibir el componente
            )}
            onClick={onClick} // Ejecuta la función onClick pasada como prop
        >
            <div className={clsx(styles.seccion1, { [styles.seccion1Small]: isSmall })}>
                <div className={clsx(styles.seccion2, { [styles.seccion2Small]: isSmall })}>
                    <p className={clsx(styles.caracteristicaPrin, { [styles.caracteristicaPrinSmall]: isSmall })}>
                        {mediaGRL}
                    </p> {/* La media de las estadísticas */}
                    <div className={styles.caracteristicas}>
                        <p className={clsx(styles.posicion, { [styles.posicionSmall]: isSmall })}>
                            {posicion}
                        </p>
                    </div>
                    <div className={styles.caracteristicas}>
                        <img
                            className={clsx(styles.imgcaract, { [styles.imgcaractSmall]: isSmall })}
                            src={`/Nacionalidades/${nacionalidad}.png`}
                            // alt={nacionalidad}
                        />
                    </div>
                    <div className={styles.caracteristicas}>
                        <img
                            className={clsx(styles.imgcaractEquipos, { [styles.imgcaractEquiposSmall]: isSmall })}
                            src={`/Equipos/${escudo}.png`}
                            // alt={escudo}
                        />
                    </div>
                </div>
                <div className={clsx(styles.imagenConDegrade)}>
                    <img
                        className={clsx(styles.img, { [styles.imgSmall]: isSmall })}
                        src={imagenJugador}
                        alt="imagenJugador"
                    />
                    <div className={styles.degrade}></div>
                </div>
            </div>
            <div className={clsx(styles.seccion2, { [styles.seccion2Small]: isSmall })}>
                <div>
                    <h1 className={clsx(styles.titulo, { [styles.tituloSmall]: isSmall })}>
                        {nombreJugador}
                    </h1>
                </div>
                <div className={clsx(styles.seccion3, { [styles.seccion3Small]: isSmall })}>
                    <div className={clsx(styles.imgstatA, { [styles.imgstatASmall]: isSmall })}>
                        <p className={clsx(styles.p, { [styles.pSmall]: isSmall })}>{ataque}</p>
                    </div>
                    <div className={clsx(styles.imgstatC, { [styles.imgstatCSmall]: isSmall })}>
                        <p className={clsx(styles.p, { [styles.pSmall]: isSmall })}>{control}</p>
                    </div>
                    <div className={clsx(styles.imgstatD, { [styles.imgstatDSmall]: isSmall })}>
                        <p className={clsx(styles.p, { [styles.pSmall]: isSmall })}>{defensa}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
