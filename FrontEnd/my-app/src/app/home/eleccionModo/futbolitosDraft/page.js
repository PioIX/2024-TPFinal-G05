// components/FutbolitosDraft.js
"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "@/Estructuras/Card";
import EleccionDraft from "@/Estructuras/EleccionDraft";

export default function FutbolitosDraft() {
    const [isVisible, setIsVisible] = useState(false);
    const [todosJugadores, setTodosJugadores] = useState([])
    const [jugadorUno, setJugadorUno] = useState([])
    const [cargando, setCargando] = useState(true);
    const toggleDropdown = () => { setIsVisible(!isVisible); };

    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null)
    const [loRecibio, setLoRecibio] = useState(false)

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
        setCargando(false)
    }

    useEffect(() => {
        PlayersTodos();
    }, []);

    if (cargando) {
        return <div className={styles.divloader}><div>No seas ansioso espera un toque</div><div className={styles.loader}></div></div>; // O algún otro componente de carga
    }
    return (
        <>
            <section>
                <div className={styles.Horizontal}>
                    <div className={styles.Vertical}>
                        <div className={styles.Jugador}>
                            <EleccionDraft posicion="PO" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador), setLoRecibio(true) }} cartaADibujar={jugadorSeleccionado} loRecibio={loRecibio}></EleccionDraft>
                        </div>
                    </div>
                    <div className={styles.Vertical}>
                        <div className={styles.Jugador} >
                            <EleccionDraft posicion="DFI" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}  cartaADibujar={jugadorSeleccionado} loRecibio={loRecibio}></EleccionDraft>
                        </div>
                        <div className={styles.Jugador}>
                            <EleccionDraft posicion="DFC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                        </div>
                        <div className={styles.Jugador}>
                            <EleccionDraft posicion="DFC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                        </div>
                        <div className={styles.Jugador}>
                            <EleccionDraft posicion="DFD" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                        </div>
                    </div>
                    <div className={styles.Vertical}>
                        <div className={styles.Jugador}>
                            <EleccionDraft posicion="MC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                        </div>
                        <div className={styles.Mco}>
                            <EleccionDraft posicion="MC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                        </div>
                        <div className={styles.Jugador}>
                            <EleccionDraft posicion="MC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                        </div>
                    </div>
                    <div className={styles.Vertical}>
                        <div className={styles.Extremos}>
                            <EleccionDraft posicion="EI" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                        </div>
                        <div className={styles.Delantero}>
                            <EleccionDraft posicion="DC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                        </div>
                        <div className={styles.Extremos}>
                            <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${styles.container} ${isVisible ? styles.show : ''}`}>
                        <div className={styles.dropdownContent}>
                            <div className={styles.HorizontalDos}>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                            </div>
                            <div className={styles.HorizontalDos}>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                <EleccionDraft posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                            </div>
                        </div>
                        {!isVisible && (
                            <button onClick={toggleDropdown} className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></button>
                        )}
                        {isVisible && (
                            <button onClick={toggleDropdown} className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg></button>
                        )}

                    </div>
                </div>
            </section>
        </>
    );
}
