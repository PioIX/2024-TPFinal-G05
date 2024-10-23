"use client";

import { useEffect, useState } from "react";
import styles from "./Paquete.module.css";
import Card from "./Card";

export default function Paquete() {
    const [abrio, setAbrio] = useState(true);
    const [cincoJugadores, setCincoJugadores] = useState([]);
    const [todosJugadores, setTodosJugadores] = useState([]);
    const [jugadoresUser, setJugadoresUser] = useState([]);

    // Función para obtener todos los jugadores
    async function PlayersTodos() {
        const userID = localStorage.getItem("userID")
        console.log(userID)
        const response = await fetch(`http://localhost:4000/Player`, {
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

        setTodosJugadores(PlayerXUser);
        AbroSobres(PlayerXUser); // Selecciona cinco jugadores al cargar
    }

    // Función para obtener jugadores del usuario
    async function PlayersDelUsuario() {
        const userID = localStorage.getItem("userID")
        console.log(userID)
        const response = await fetch(`http://localhost:4000/PlayerXUser?userID=${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        console.log(respuesta)
        // localStorage.setItem("playersID", respuesta.players)
        // console.log()

        const responseDos = await fetch(`http://localhost:4000/PlayerXUserDos?playerID=${respuesta.players}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuestaDos = await responseDos.json();

        const PlayerXUser = respuestaDos.map(Player => ({
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
    console.log(jugadoresUser)
    // Función para seleccionar cinco jugadores aleatorios que no estén en jugadoresUser
    function AbroSobres(jugadores) {
        console.log(jugadoresUser)
        const idsJugadoresUser = new Set(jugadoresUser.map(player => player.PlayerId)); // Crear un conjunto de IDs de jugadores del usuario
        console.log(idsJugadoresUser)
        const jugadoresDisponibles = jugadores.filter(player => !idsJugadoresUser.has(player.PlayerId)); // Filtrar jugadores disponibles
        console.log(jugadoresDisponibles)
        if (jugadoresDisponibles.length < 5) {
            alert("No hay suficientes jugadores disponibles."); // Alerta si no hay suficientes jugadores
            return;
        }

        // Función para barajar el array
        const barajar = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const jugadoresAleatorios = barajar(jugadoresDisponibles).slice(0, 5);
        setCincoJugadores(jugadoresAleatorios);
        setJugadoresUser(prev => [...prev, ...jugadoresAleatorios]); // Añadir jugadores seleccionados al array de jugadores del usuario
    }
console.log(jugadoresUser)
    useEffect(() => {
        PlayersTodos();
        PlayersDelUsuario();
    }, []);

    return (
        <div>
            {abrio ? (
                <div className={styles.Sobre} onClick={() => setAbrio(false)}>ssss</div>
            ) : (
                <div className={styles.ConjuntoCartas}>
                    {cincoJugadores.map((jugador) => (
                        <Card
                            key={jugador.PlayerId} // Asegúrate de agregar una clave única
                            isSmall={true}
                            posicion={jugador.Posicion}
                            nacionalidad={jugador.Nacionalidad}
                            imagenJugador={jugador.Imagen}
                            escudo={jugador.Equipo}
                            nombreJugador={jugador.Apellido}// Concatenar nombre y apellido
                            ataque={jugador.Ataque}
                            control={jugador.Control}
                            defensa={jugador.Defensa}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
