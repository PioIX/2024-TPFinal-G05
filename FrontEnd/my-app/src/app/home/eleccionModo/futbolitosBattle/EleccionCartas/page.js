"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Texto from "@/Components/Texto";
import Button from "@/Components/Button";
import CardTable from "@/Estructuras/CardTable";
import CardEleccion from "@/Estructuras/CardEleccion";


export default function futbolitosBattle() {
    const [jugadoresUser, setJugadoresUser] = useState([])
    const [bloqueado, setBloqueado] = useState(true)

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
    console.log(jugadoresUser)

    function hola(){
        if (bloqueado) {
            console.log("hola")
            setBloqueado(false)
        }
    }

    useEffect(() => {
        PlayersDelUsuario();
    }, []);
    return (
        <section className={styles.main}>
            <div className={styles.informacion}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Texto variant="h2" text="Elegi tu equipo"></Texto>
                <Texto variant="p" text="Selecciona tres jugadores para que formen parte de tu baraja"></Texto>
                <Texto variant="p" text="¡Cuando tengas tu equipo seleciona Confirmar!"></Texto>
                <div className={styles.InfoBotones}>
                    <Button variant="normal" text = "Confirmar" ></Button>
                    <button disabled = {bloqueado}></button>
                </div>
            </div>
            
            <CardEleccion
                Cadena={jugadoresUser}
            ></CardEleccion>
            
        </section>
    )
}