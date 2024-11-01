"use client";
import { useState } from "react";
import clsx from "clsx";
import styles from "./CardBattle.module.css";

export default function CardBattle({
    media,
    posicion,
    nacionalidad,
    imagenJugador,
    escudo,
    nombreJugador,
    ataque,
    control,
    defensa,
    isSmall = false, // Nueva prop para la variante
    onClickControl,
    onClickDefensa,
    onClickAtaque
}) {
    const mediaGRL = Math.round(((ataque + control + defensa) / 3) + 7);
    
    const [activeStat, setActiveStat] = useState(null);

    const handleStatClick = (stat) => {
        setActiveStat(stat);
    };

    return (
        <div className={clsx(styles.carta, { [styles.cartaSmall]: isSmall })}>
            <div className={clsx(styles.seccion1, { [styles.seccion1Small]: isSmall })}>
                <div className={clsx(styles.seccion2, { [styles.seccion2Small]: isSmall })}>
                    <p className={clsx(styles.caracteristicaPrin, { [styles.caracteristicaPrinSmall]: isSmall })}>{mediaGRL}</p>
                    <div className={styles.caracteristicas}>
                        <p className={clsx(styles.posicion, { [styles.posicionSmall]: isSmall })}>{posicion}</p>
                    </div>
                    <div className={styles.caracteristicas}>
                        <img
                            className={clsx(styles.imgcaract, { [styles.imgcaractSmall]: isSmall })}
                            src={`/Nacionalidades/${nacionalidad}`}
                            alt="."
                        />
                    </div>
                    <div className={styles.caracteristicas}>
                        <img
                            className={clsx(styles.imgcaract, { [styles.imgcaractSmall]: isSmall })}
                            src={`/Escudos/${escudo}`}
                            alt="."
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
                    <h1 className={clsx(styles.titulo, { [styles.tituloSmall]: isSmall })}>{nombreJugador}</h1>
                </div>
                <div className={clsx(styles.seccion3, { [styles.seccion3Small]: isSmall })}>
                    <div
                        className={clsx(styles.imgstatA, { 
                            [styles.activeStat]: activeStat === 'ataque', 
                            [styles.hidden]: activeStat && activeStat !== 'ataque',
                            [styles.imgstatASmall]: isSmall 
                        })}
                        onClick={onClickAtaque} onClickCapture={() => handleStatClick('ataque')}
                    >
                        <p className={clsx(styles.p, { [styles.pSmall]: isSmall })}>{ataque}</p>
                    </div>
                    <div
                        className={clsx(styles.imgstatC, { 
                            [styles.activeStat]: activeStat === 'control', 
                            [styles.hidden]: activeStat && activeStat !== 'control',
                            [styles.imgstatCSmall]: isSmall 
                        })}
                        onClick={onClickControl} onClickCapture={() => handleStatClick('control')}
                    >
                        <p className={clsx(styles.p, { [styles.pSmall]: isSmall })}>{control}</p>
                    </div>

                    <div
                        className={clsx(styles.imgstatD, { 
                            [styles.activeStat]: activeStat === 'defensa', 
                            [styles.hidden]: activeStat && activeStat !== 'defensa',
                            [styles.imgstatDSmall]: isSmall 
                        })}
                        onClick={onClickDefensa} onClickCapture={() => handleStatClick('defensa')}
                    >
                        <p className={clsx(styles.p, { [styles.pSmall]: isSmall })}>{defensa}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}