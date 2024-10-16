"use client"
import styles from "./Card.module.css"

export default function Card({media, posicion, nacionalidad, imagenJugador, escudo, nombreJugador, ataque,control, defensa}) {
    return (
        <div className={styles.carta}>
                <div className={styles.seccion1}>
                    <div className={styles.seccion2}>
                        <p className={styles.caracteristicaPrin}>{media}</p>
                        <div className={styles.caracteristicas}>
                            <p className={styles.posicion}>{posicion}</p>
                        </div>
                        <div className={styles.caracteristicas}>
                            <img className={styles.imgcaract}
                                src={`/Nacionalidades/${nacionalidad}`}
                                alt="imagen">
                            </img>
                        </div>
                        <div className={styles.caracteristicas}>
                            <img className={styles.imgcaract}
                                src={`/Escudos/${escudo}`}
                                alt="imagen">
                            </img>
                        </div>
                    </div>
                    <div>
                        <img className={styles.img}
                            src={imagenJugador}
                            alt="imagen">
                        </img>
                    </div>
                </div>
                <div className={styles.seccion2}>
                    <div>
                        <h1 className={styles.titulo}>{nombreJugador}</h1>
                    </div>
                    <div className={styles.seccion3}>
                        <div className={styles.imgstatA}>
                            <p className={styles.p}>{ataque}</p>
                        </div>
                        <div className={styles.imgstatC}>
                            <p className={styles.p}>{control}</p>
                        </div>
                        <div className={styles.imgstatD}>
                            <p className={styles.p}>{defensa}</p>
                        </div>
                    </div> 
                </div>
            </div>
    )
}