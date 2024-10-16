"use client"
import styles from "./Card.module.css"

export default function Card(src) {
    return (
        <div className={styles.carta}>
            <div className={styles.seccion2}>
                <div className={styles.seccion1}>
                    <div className={styles.caracteristicaPrin}>
                        <img className={styles.imgcaract}
                            src="/images/statsAtaque.png"
                            alt="imagen">
                        </img>
                    </div>
                    <div className={styles.caracteristicas}>
                        <img className={styles.imgcaract}
                            src="/images/statsAtaque.png"
                            alt="imagen">
                        </img>
                    </div>
                    <div className={styles.caracteristicas}>
                        <img className={styles.imgcaract}
                            src="/images/statsAtaque.png"
                            alt="imagen">
                        </img>
                    </div>
                </div>
                <div className={styles.seccion1}>
                    <div>
                        <img className={styles.img}
                            src="/Jugadores/Bundesliga/BorussiaDortmund/Adeyemi.png"
                            alt="imagen">
                        </img>
                    </div>
                    <div>
                        <h1 className={styles.titulo}>Adeyemi</h1>
                    </div>
                    <div className={styles.seccion2}>
                        <div className={styles.imgstatA}>
                            <p className={styles.p}>23</p>
                        </div>
                        <div className={styles.imgstatC}>
                            <p className={styles.p}>23</p>
                        </div>
                        <div className={styles.imgstatD}>
                            <p className={styles.p}>23</p>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}