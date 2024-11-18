"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "./CardEleccion.module.css";

export default function CardEleccion({ Cadena, onPlayerSelect, equipo }) {
    const [jugadoresActivos, setJugadoresActivos] = useState(equipo || []); // Controla los jugadores activos

    const elijoJugador = (id) => {
        setJugadoresActivos((prevJugadores) => {
            const nuevoEquipo = [...prevJugadores];

            // Si el jugador ya está activo, lo desactiva
            if (nuevoEquipo.includes(id)) {
                return nuevoEquipo.filter((playerId) => playerId !== id);
            }

            // Si hay 3 jugadores activos, elimina el primero
            if (nuevoEquipo.length === 3) {
                nuevoEquipo.shift();
            }

            // Añade el nuevo jugador
            nuevoEquipo.push(id);

            // Notificar al padre los jugadores seleccionados
            onPlayerSelect(nuevoEquipo);

            return nuevoEquipo;
        });
    };

    return (
        <div className={styles.Desk}>
            {Cadena.map((jugador) => (
                <Card
                    
                    // PlayerId={jugador.PlayerId}
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
                    jugadorActivo={jugadoresActivos.includes(jugador.PlayerId)} // Pasar si está activo
                />
            ))}
        </div>
    );
}
