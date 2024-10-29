"use client";
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";
import Card from "@/Estructuras/Card";
import CardBattle from "@/Estructuras/CardBattle";

export default function Juego({ EquipoDeTres }) {
    const { socket, isConnected } = useSocket();
    const [cambio, setCambio] = useState(true);
    const [jugadores, setJugadores] = useState([]);
    const [cartaSeleccionada, setCartaSeleccionada] = useState(null); // Cambia a null por defecto

    const toggleMode = () => setCambio(!cambio);

    useEffect(() => {
        if (!socket || !isConnected) return;
    }, [socket, isConnected]);

    useEffect(() => {
        async function obtenerEquipo() {
            const playersId = EquipoDeTres;
            try {
                const response = await fetch(`http://localhost:4000/EquipoDefinido?playersId=${playersId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const respuesta = await response.json();
                setJugadores(respuesta);
                console.log("Jugadores obtenidos:", respuesta);
            } catch (error) {
                console.error("Error al obtener el equipo:", error);
            }
        }
        obtenerEquipo();
    }, []);

    function seleccionarJugador(jugador) {
        console.log(jugador);
        setCartaSeleccionada(jugador);
    }

    return (
        <section className={styles.main}>
            <div className={styles.Juego}>
                <div>
                    {cartaSeleccionada && ( // Verifica si hay un jugador seleccionado
                        <CardBattle
                            isSmall={false} // Puedes cambiar esto según lo necesites
                            posicion={cartaSeleccionada.Posicion}
                            nacionalidad={cartaSeleccionada.Nacionalidad}
                            imagenJugador={cartaSeleccionada.Imagen}
                            escudo={cartaSeleccionada.Equipo}
                            nombreJugador={cartaSeleccionada.Apellido}
                            ataque={cartaSeleccionada.Ataque}
                            control={cartaSeleccionada.Control}
                            defensa={cartaSeleccionada.Defensa}
                        />
                    )}
                </div>
            </div>
            <div id="Cards" className={styles.Cards}>
                {jugadores.map((jugador) => (
                    <Card
                        key={jugador.Id} // Asegúrate de tener una clave única
                        isSmall={true}
                        posicion={jugador.Posicion}
                        nacionalidad={jugador.Nacionalidad}
                        imagenJugador={jugador.Imagen}
                        escudo={jugador.Equipo}
                        nombreJugador={jugador.Apellido}
                        ataque={jugador.Ataque}
                        control={jugador.Control}
                        defensa={jugador.Defensa}
                        onClick={() => seleccionarJugador(jugador)} // Llama a seleccionarJugador
                    />
                ))}
            </div>
        </section>
    );
}