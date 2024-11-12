"use client"

import { useState } from "react"
import Card from "./Card"
import styles from "./CardTableDraft.module.css"

export default function CardTableDraft({
    JugadorUno,
    JugadorDos,
    JugadorTres,
    JugadorCuatro,
    JugadorCinco,
    JugadorSeis,
    JugadorSiete,
    JugadorOcho,
    JugadorNueve,
    JugadorDiez,
    JugadorOnce,
}) {
    const [JugadorUnoEstado, setJugadorUnoEstado] = useState(true)
    return (
        <>
            <div className={styles.Vertical}>
                <div className={styles.Horizontal}>
                    <div className={styles.Jugador}>
                        <div>aaaaaa</div>
                        {JugadorUnoEstado && JugadorUno && (
                            <>
                                <Card
                                    isSmall={true}
                                    posicion={JugadorUno.Posicion}
                                    nacionalidad={JugadorUno.Nacionalidad}
                                    imagenJugador={JugadorUno.Imagen}
                                    escudo={JugadorUno.Equipo}
                                    nombreJugador={JugadorUno.Apellido}
                                    ataque={JugadorUno.Ataque}
                                    control={JugadorUno.Control}
                                    defensa={JugadorUno.Defensa}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}