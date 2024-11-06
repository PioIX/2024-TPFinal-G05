"use client";

import { useEffect, useState } from "react"; // Asegúrate de importar useState
import Card from "./Card";
import styles from "./CardEleccion.module.css";

export default function CardEleccion({ Cadena, onPlayerSelect, equipo }) {
    const [jugadorActivo, setJugadorActivo] = useState(null); // Estado para el jugador activo
    const [jugadorEquipo, setJugadorEquipo] = useState(null); // Estado para el jugador activo


    const elijoJugador = (id) => {
        onPlayerSelect(id); // Llama a la función de selección del jugador
        setJugadorActivo(id)
        setJugadorEquipo(equipo)
        console.log(equipo)
    };

    return (
        <div className={styles.Desk}>
            {Cadena.map((jugador) => (
                <Card
                    key={jugador.PlayerId} // Añade una key única para cada Card
                    PlayerId = {jugador.PlayerId}
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
                    jugadorActivo = {jugadorActivo}
                    className={ styles.active} // Añade clase activa
                />
            ))}
        </div>
    );
}
