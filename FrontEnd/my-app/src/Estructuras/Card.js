"use client"
import styles from "./Card.module.css"

export default function Card(src) {
    return (
        <div className={styles.carta}>
            <div className={styles.seccion1}>
                <div>
                    <img className={styles.img}
                        src="/Jugadores/Bundesliga/BorussiaDortmund/Adeyemi.png"
                        alt="imagen">
                    </img>
                </div>
                <div className={styles.fondostats}>
                    <div>
                        <h1 className={styles.titulo}>Título</h1>
                    </div>
                    <div className={styles.seccion2}>
                        <div className={styles.imgstatA}>
                            <p>23</p>
                        </div>
                        <div className={styles.imgstatC}>
                            <p>23</p>
                        </div>
                        <div className={styles.imgstatD}>
                            <p>23</p>
                        </div>
                    </div>   
                </div>
                
            </div>
        </div>
    )
}