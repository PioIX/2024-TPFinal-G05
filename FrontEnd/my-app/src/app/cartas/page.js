"use client"

import CardTable from "@/Estructuras/CardTable";
import styles from "./page.module.css";
import Texto from "@/Components/Texto";
import Button from "@/Components/Button";
import { useEffect, useState } from "react";

export default function Cartas() {
    const [jugadoresUser, setJugadoresUser] = useState([])
    const [todosJugadores, setTodosJugadores] = useState([])
    const [miosTodos, setMiosTodos] = useState(true)
    const ToggleMode = () => setMiosTodos(!miosTodos);

    async function PlayersTodos() {
        const response = await fetch('http://localhost:4000/Player', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const respuesta = await response.json()

        console.log(respuesta)

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
            Defenza: Player.Defenza,
            Media: Player.Media
        }));

        setTodosJugadores(PlayerXUser)
    }

    async function PlayersDelUsuario() {
        const response = await fetch('http://localhost:4000/PlayerXUser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const respuesta = await response.json()

        console.log(respuesta)

        const responseDos = await fetch('http://localhost:4000/PlayerXUserDos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const respuestaDos = await responseDos.json()

        console.log(respuestaDos)

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
            Defenza: Player.Defenza,
            Media: Player.Media
        }));

        setJugadoresUser(PlayerXUser)
    }

    useEffect(() => {
        PlayersTodos();
        PlayersDelUsuario();
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.informacion}>
                <Texto variant = "title" text = "Cartas"></Texto>
                <Texto variant = "p" text = "En esta seccion podes ver todos los jugadores del juego y tambien que jugadores tenees actualmente."></Texto>
                <Texto variant = "p" text = "¡Selecciona la opcion que queres mostrar!"></Texto>
                <div className={styles.InfoBotones}>
                    <Button variant = "normal" text = "Mis cartas" onClick = {ToggleMode} ></Button>
                    <Button variant = "normal" text = "Cartas Futbolito" onClick = {ToggleMode} ></Button>
                </div>
            </div>
            {miosTodos ? (
                <CardTable
                    Cadena = {todosJugadores}
                ></CardTable>
            ) : (
                <CardTable
                    Cadena = {jugadoresUser}
                ></CardTable>
            )}
        </main>
    )
}