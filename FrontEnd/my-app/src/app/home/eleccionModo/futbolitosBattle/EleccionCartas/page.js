"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Texto from "@/Components/Texto";
import Button from "@/Components/Button";
import CardTable from "@/Estructuras/CardTable";
import CardEleccion from "@/Estructuras/CardEleccion";


export default function futbolitosBattle() {
    const [jugadoresUser, setJugadoresUser] = useState([])

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
            Defensa: Player.Defensa
        }));

        setJugadoresUser(PlayerXUser)
    }

    useEffect(() => {
        PlayersDelUsuario();
    }, []);
    return (
        <section className={styles.main}>
            <div className={styles.informacion}>
                <Texto variant="title" text="Cartas"></Texto>
                <Texto variant="p" text="En esta seccion podes ver todos los jugadores del juego y tambien que jugadores tenees actualmente."></Texto>
                <Texto variant="p" text="¡Selecciona la opcion que queres mostrar!"></Texto>
                <div className={styles.InfoBotones}>
                    <Button variant="normal" text = "Confirmar" ></Button>
                </div>
            </div>
            
            <CardEleccion
               Cadena = {jugadoresUser}
            ></CardEleccion>
            
        </section>
    )
}