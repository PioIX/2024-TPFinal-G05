"use client"

import Card from "./Card"
import styles from "./CardEleccion.module.css"

export default function CardEleccion({ Cadena, onPlayerSelect }) {
    const elijoJugador = (id) => {
        onPlayerSelect(id); // Llama a la función de `futbolitosBattle`
    };
    return (
        <div className={styles.Desk}>
            {Cadena.map((jugador) => (
                <Card
                    isSmall={true}
                    posicion={jugador.Posicion}
                    nacionalidad={jugador.Nacionalidad}
                    imagenJugador={jugador.Imagen}
                    escudo={jugador.Equipo}
                    nombreJugador={jugador.Apellido}
                    ataque={jugador.Ataque}
                    control={jugador.Control}
                    defensa={jugador.Defensa}
                    onClick={() => elijoJugador(jugador.PlayerId)}
                />
            ))}
        </div>
    )
}