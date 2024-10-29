"use client";
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/Estructuras/Card";

export default function Juego({ EquipoDeTres }) {
    const { socket, isConnected } = useSocket();
    const [cambio, setCambio] = useState(true);
    const [jugadores, setJugadores] = useState([]);

    const toggleMode = () => setCambio(!cambio);

    useEffect(() => {
        if (!socket || !isConnected) return;
    }, [socket, isConnected]);

    useEffect(() => {
        async function obtenerEquipo() {
            const playersId = EquipoDeTres
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
    console.log(jugadores)
    return (
        <section className={styles.main}>
            <div id="juego" className={styles.Juego}></div>
            <div id="Cards" className={styles.Cards}>
                {jugadores.map((jugador) => (
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
                        onClick={console.log("Haz click")}
                    />
                ))}
            </div>
        </section>
    );
}
