"use client"
import NavTop from "@/Estructuras/NavTop"
import styles from "./page.module.css"

export default function Guia() {
    return (
        <section className={styles.main}>
            <div className={styles.div}>
                <div>
                    <h1 className={styles.h1}>Guía</h1>
                </div>
                <div className={styles.texto}>
                    <h2>Introducción</h2>
                    <p>
                        Este juego ofrece dos modos: FutDraft y un enfrentamiento online.
                    </p>

                    <h2>Modo 1: FutDraft</h2>

                    <h3>Objetivo</h3>
                    <p>Arma un equipo que combine la mayor media posible con una química óptima entre los jugadores.</p>

                    <h3>Pasos para Armar tu Equipo</h3>
                    <ul>
                        <li>
                            <strong>Selecciona a tus Jugadores:</strong>
                            <p>Busca jugadores con altas medias. Recuerda que un jugador de media alta no siempre garantiza un buen rendimiento si su química con el equipo es baja.</p>
                        </li>
                        <li>
                            <strong>Maximiza la Química:</strong>
                            <ul>
                                <li><strong>Nacionalidad:</strong> Intenta incluir jugadores de la misma nacionalidad.</li>
                                <li><strong>Liga y Club:</strong> Los jugadores que compiten en la misma liga o pertenecen al mismo club tienden a tener mejor química.</li>
                                <li><strong>Posiciones:</strong> Asegúrate de que los jugadores estén en posiciones compatibles dentro de la formación.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Experimenta con Formaciones:</strong>
                            <p>Prueba diferentes formaciones para encontrar la que mejor funcione con tu selección de jugadores. Algunas formaciones pueden potenciar la química.</p>
                        </li>
                        <li>
                            <strong>Analiza y Ajusta:</strong>
                            <p>Después de jugar algunas partidas, analiza el rendimiento de tu equipo. Si algo no funciona, no dudes en realizar cambios.</p>
                        </li>
                    </ul>

                    <h2>Modo 2: Competitivo (Uno contra Otro)</h2>

                    <h3>Objetivo</h3>
                    <p>Selecciona tres de tus jugadores para compararlos con los del oponente y ganar.</p>

                    <h3>Estrategias para el Enfrentamiento</h3>
                    <ul>
                        <li>
                            <strong>Selección de Jugadores:</strong>
                            <p>Elige cuidadosamente a los tres jugadores. Considera no solo su media, sino también sus habilidades específicas que pueden ser decisivas en la comparación.</p>
                        </li>
                        <li>
                            <strong>Conoce a tu Oponente:</strong>
                            <p>Si tienes la oportunidad, estudia el equipo de tu rival. Esto te ayudará a decidir qué jugadores tienen más posibilidades de ganar.</p>
                        </li>
                        <li>
                            <strong>Adaptación:</strong>
                            <p>Sé flexible. Si notas que ciertos jugadores no rinden como esperabas en competiciones previas, considera cambiarlos por otros que puedan tener un mejor desempeño.</p>
                        </li>
                        <li>
                            <strong>Aprovecha Ventajas:</strong>
                            <p>Si tus jugadores tienen bonificaciones especiales o atributos que los destacan, asegúrate de usarlos a tu favor.</p>
                        </li>
                    </ul>

                    <h2>Consejos Adicionales</h2>
                    <ul>
                        <li>
                            <strong>Gestión de Recursos:</strong>
                            <p>Administra tus monedas y fichas sabiamente. Invierte en jugadores que realmente puedan mejorar tu equipo.</p>
                        </li>
                        <li>
                            <strong>Participa en Eventos:</strong>
                            <p>Mantente activo en eventos y desafíos para obtener recompensas y nuevos jugadores.</p>
                        </li>
                        <li>
                            <strong>Actualizaciones:</strong>
                            <p>Sigue las actualizaciones del juego. Nuevos jugadores y cambios en estadísticas pueden influir en tu estrategia.</p>
                        </li>
                    </ul>

                    <h2>Conclusión</h2>
                    <p>
                        El éxito en este juego se basa en la combinación de una sólida construcción de equipo y una estrategia efectiva en los enfrentamientos. Dedica tiempo a conocer a tus jugadores y a analizar tus partidas. ¡Con esfuerzo y dedicación, estarás en camino a convertirte en un verdadero campeón! ¡Buena suerte!
                    </p>
                </div>
            </div>
        </section>
    )
}