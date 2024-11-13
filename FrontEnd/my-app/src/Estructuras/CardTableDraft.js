"use client"

import { useEffect, useState } from "react"
import Card from "./Card"
import styles from "./CardTableDraft.module.css"
import EleccionDraft from "./EleccionDraft"

export default function CardTableDraft({

}) {
    const [JugadorUnoEstado, setJugadorUnoEstado] = useState(false)
    const [JugadorUno, setJugadorUno] = useState([])

    // useEffect(() => {
    //     setJugadorUnoEstado(true)
    // }, [JugadorUno]);

    function elijoJugador(jugador) {
        console.log(jugador)
        setJugadorUno(jugador)
        setJugadorUnoEstado(true)
    }


    return (
        <>
            <div className={styles.Vertical}>
                <div className={styles.Horizontal}>
                    <div className={styles.Jugador}>
                        <EleccionDraft inClock={elijoJugador}>
                            {!JugadorUnoEstado && !JugadorUno && (
                                <>
                                    <p>AAAAAAAAAAAAAAA</p>  {/* Hacer Componente */}
                                </>
                            )}
                        </EleccionDraft>
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