// components/FutbolitosDraft.js
"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "@/Estructuras/Card";
import CardTableDraft from "@/Estructuras/CardTableDraft";
import EleccionDraft from "@/Estructuras/EleccionDraft";

export default function FutbolitosDraft() {
    const [isVisible, setIsVisible] = useState(false);
    const [todosJugadores, setTodosJugadores] = useState([])
    const [jugadorUno, setJugadorUno] = useState([])
    const toggleDropdown = () => {setIsVisible(!isVisible);};

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
            Defensa: Player.Defensa
        }));

        setTodosJugadores(PlayerXUser)
    }

    useEffect(() => {
        PlayersTodos();
    }, []);
    return (
        <section>
            
            <CardTableDraft ></CardTableDraft>
            <div>
                {isVisible && (
                    <div>aaaaaaaaaaa</div>
                )}
                <div className={`${styles.container} ${isVisible ? styles.show : ''}`}>
                    <div className={styles.dropdownContent}>
                        <p>Contenido del desplegable</p>
                    </div>
                    <button onClick={toggleDropdown} className={styles.button}>-</button>
                </div>
            </div>
        </section>
    );
}
