"use client";
import NavTop from "@/Estructuras/NavTop";
import styles from "./page.module.css";

export default function Guia() {
    return (
        <section className={styles.main}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className={styles.modos}>
                <div className={styles.modo}>
                    <h2 className={styles.h2}>Modo 1: FutDraft</h2>
                    <h3>Objetivo</h3>
                    <p>Arma un equipo que combine la mayor media posible con una química óptima entre los jugadores.</p>
                    <h3>Pasos para Armar tu Equipo</h3>
                            <strong>Selecciona a tus Jugadores:</strong>
                            <p>Busca jugadores con altas medias. Recuerda que un jugador de media alta no siempre garantiza un buen rendimiento si su química con el equipo es baja.</p>
                            <strong>Maximiza la Química:</strong>
                            <ul>
                                <li className={styles.li}><strong>Nacionalidad:</strong> Intenta incluir jugadores de la misma nacionalidad.</li>
                                <li className={styles.li}><strong>Liga y Club:</strong> Los jugadores que compiten en la misma liga o pertenecen al mismo club tienden a tener mejor química.</li>
                                <li className={styles.li}><strong>Posiciones:</strong> Asegúrate de que los jugadores estén en posiciones compatibles dentro de la formación.</li>
                            </ul>
                </div>
                <div className={styles.divisor}></div> {/* Línea divisoria */}
                <div className={styles.modo}>
                    <h2 className={styles.h2}>Modo 2: Competitivo</h2>
                    <h3>Objetivo</h3>
                    <p>Selecciona tres de tus jugadores para compararlos con los del oponente y ganar.</p>
                    <h3>Estrategias para el Enfrentamiento</h3>
                    <ul>
                        <li className={styles.li}>
                            <strong>Selección de Jugadores:</strong>
                            <p>Elige cuidadosamente a los tres jugadores. Considera no solo su media, sino también sus habilidades específicas que pueden ser decisivas en la comparación.</p>
                        </li>
                        <li className={styles.li}>
                            <strong>Conoce a tu Oponente:</strong>
                            <p>Si tienes la oportunidad, estudia el equipo de tu rival. Esto te ayudará a decidir qué jugadores tienen más posibilidades de ganar.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
