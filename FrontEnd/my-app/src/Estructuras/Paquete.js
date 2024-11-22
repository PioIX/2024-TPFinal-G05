"use client";

import { useEffect, useState } from "react";
import styles from "./Paquete.module.css";
import Card from "./Card";
import Button from "@/Components/Button";
import Texto from "@/Components/Texto";

export default function Paquete({ onClickButton, onClickButtonDos }) {
    const [abrio, setAbrio] = useState(true);
    const [desvanecer, setDesvanecer] = useState(false);
    const [cincoJugadores, setCincoJugadores] = useState([]);
    const [jugadoresUser, setJugadoresUser] = useState([]);
    const [jugadoresTodos, setJugadoresTodos] = useState([])
    const [mensajeNoHayJugadores, setMensajeNoHayJugadores] = useState(false)
    const [otroBoton, setOtroBoton] = useState(false)
    const [cargando, setCargando] = useState(true); // Estado de carga

    // Función para obtener todos los jugadores
    async function PlayersTodos() {
        const response = await fetch(`http://10.1.5.136:3000/Player`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();

        const PlayerXUser = respuesta.map(Player => ({
            PlayerId: Player.PlayerId,
            Nombre: Player.Nombre,
            Apellido: Player.Apellido,
            Nacionalidad: Player.Nacionalidad,
            Equipo: Player.Equipo,
            Posicion: Player.Posicion,
            Imagen: Player.Imagen,
            Ataque: Player.Ataque,
            Control: Player.Control,
            Defensa: Player.Defensa
        }));
        
        console.log(PlayerXUser); // Todos LOS JUGADORES
        setJugadoresTodos(PlayerXUser)
        setCargando(false);
        return PlayerXUser;
    }

    // Función para obtener jugadores del usuario
    async function PlayersDelUsuario() {
        const userID = localStorage.getItem("userID");
        const response = await fetch(`http://localhost:4000/PlayerXUserDetalles?userID=${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        const PlayerXUser = respuesta.map(Player => ({
            PlayerId: Player.PlayerId,
            Nombre: Player.Nombre,
            Apellido: Player.Apellido,
            Nacionalidad: Player.Nacionalidad,
            Equipo: Player.Equipo,
            Posicion: Player.Posicion,
            Imagen: Player.Imagen,
            Ataque: Player.Ataque,
            Control: Player.Control,
            Defensa: Player.Defensa
        }));
        console.log(PlayerXUser)
        setJugadoresUser(PlayerXUser);
        
    }

    async function AbroSobres(jugadores) {
        const userID = localStorage.getItem("userID");
        console.log(jugadoresUser)
        console.log(jugadoresUser.PlayerId)
        const idsJugadoresUser = new Set(jugadoresUser.map(player => player.PlayerId));
        console.log(idsJugadoresUser);
        const jugadoresDisponibles = jugadores.filter(player => !idsJugadoresUser.has(player.PlayerId));
        console.log("Jugadores Disponibles: ", jugadoresDisponibles);

        if (jugadoresDisponibles.length < 5) {
            // alert("No hay suficientes jugadores disponibles.");
            setMensajeNoHayJugadores(true)
            setOtroBoton(true)
            return;
        }

        const barajar = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const jugadoresAleatorios = barajar(jugadoresDisponibles).slice(0, 5);
        setCincoJugadores(jugadoresAleatorios);

        console.log("IDs de los jugadores aleatorios:", jugadoresAleatorios.map(player => player.PlayerId));

        const response = await fetch('http://localhost:4000/AbriSobre', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userID, // Asegúrate de enviar el userId
                playerIds: jugadoresAleatorios.map(player => player.PlayerId) // Extraer solo los IDs
            }),
        });
        console.log("Guardé en la base de datos los jugadores: ", response);
    }

    useEffect(() => {
        PlayersDelUsuario()
        PlayersTodos()
    }, []);

    const handleClick = () => {
        AbroSobres(jugadoresTodos)
        setDesvanecer(true);
        setTimeout(() => {
            setAbrio(false);
            setDesvanecer(false);
        }, 500);
    };

    if (cargando) {
        return <div className={styles.divloader}><div className={styles.loader}></div></div>; // O algún otro componente de carga
    }

    return (
        <div className={styles.container}>
            {abrio && (
                <div
                    className={`${styles.Sobre} ${desvanecer ? styles.hidden : ''}`}
                    onClick={handleClick}
                ></div>
            )}
            {!abrio && (
                <div>
                    <div className={styles.ConjuntoCartas}>
                        {cincoJugadores.map((jugador) => (
                            <Card
                                key={jugador.PlayerId}
                                isSmall={true}
                                posicion={jugador.Posicion}
                                nacionalidad={jugador.Nacionalidad}
                                imagenJugador={jugador.Imagen}
                                escudo={jugador.Equipo}
                                nombreJugador={jugador.Apellido}
                                ataque={jugador.Ataque}
                                control={jugador.Control}
                                defensa={jugador.Defensa}
                            />
                        ))}
                    </div>
                    {mensajeNoHayJugadores && (
                        <Texto variant="p" text="Ya conseguiste todos los jugadores! ¡Felicidades!"></Texto>
                    )}
                    {otroBoton && (
                        <div className={styles.puntopunto}>
                            <Button onClick={onClickButtonDos} variant="jugar" text="Entendido"></Button>
                        </div>
                    )}
                    {!otroBoton && (
                        <div className={styles.puntopunto}>
                            <Button onClick={onClickButton} variant="jugar" text="Continuar"></Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}