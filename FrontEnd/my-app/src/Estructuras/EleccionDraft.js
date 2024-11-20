"use client";

import { useEffect, useState } from "react";
import styles from "./EleccionDraft.module.css";
import Card from "./Card";
import Button from "@/Components/Button";
import CartaVacia from "@/Components/CartaVacia";

export default function EleccionDraft({ onClickButton, inClock }) {
    const [jugadoresId, setJugadoresId] = useState([])
    const [abrio, setAbrio] = useState(false);
    const [desvanecer, setDesvanecer] = useState(false);
    const [cincoJugadores, setCincoJugadores] = useState([]);
    const [jugadoresUser, setJugadoresUser] = useState([]);
    const [jugadoresTodos, setJugadoresTodos] = useState([])
    const [otraFuncion, setOtraFuncion] = useState(false)

    const [cartaVacia, setCartaVacia] = useState(true)

    const [JugadorUnoEstado, setJugadorUnoEstado] = useState(false)
    const [JugadorUno, setJugadorUno] = useState([])

    async function PlayersTodos() {
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

        console.log(PlayerXUser);
        setJugadoresTodos(PlayerXUser)
        return PlayerXUser;
    }

    async function AbroSobres(jugadores) {
        console.log("Jugadores disponibles: ", jugadores);

        if (jugadores.length < 5) {
            alert("No hay suficientes jugadores disponibles.");
            return;
        }
        const barajar = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const jugadoresAleatorios = barajar(jugadores).slice(0, 5);
        setCincoJugadores(jugadoresAleatorios);

        console.log("IDs de los jugadores aleatorios:", jugadoresAleatorios.map(player => player.PlayerId));
    }
    console.log(cincoJugadores)

    useEffect(() => {
        PlayersTodos()
    }, []);

    const handleClick = () => {
        AbroSobres(jugadoresTodos)
        setDesvanecer(true);
        setTimeout(() => {
            setAbrio(true);
            // setDesvanecer(false);
        }, 500);
    };

    function seleccionarJugador(jugador) {
        console.log(jugador)
        setJugadorUno(jugador)
        setJugadorUnoEstado(true)
        setAbrio(false)
        setCartaVacia(false)
        setOtraFuncion(true)
    }

    return (
        <>
            {otraFuncion && (
                <>
                    {JugadorUnoEstado && JugadorUno && (
                        <>
                            <Card
                                isSmall={true}
                                posicion={JugadorUno.Posicion}
                                nacionalidad={JugadorUno.Nacionalidad}
                                imagenJugador={JugadorUno.Imagen}
                                escudo={JugadorUno.Equipo}
                                nombreJugador={JugadorUno.Apellido}
                                ataque={JugadorUno.Ataque}
                                control={JugadorUno.Control}
                                defensa={JugadorUno.Defensa}
                            />
                        </>
                    )}
                </>
            )}
            {abrio ? (
                <div className={styles.container}>
                    <div className={styles.divAround}>
                        <div className={styles.divTituloBOX}>
                            <p>Elije a un Jugador</p>
                        </div>
                        <div>
                            <div className={styles.ConjuntoCartas}>
                                {cincoJugadores.map((jugador) => (
                                    <div>
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
                                            onClick={() => seleccionarJugador(jugador)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div onClick={handleClick}>
                    {cartaVacia && cartaVacia && (
<<<<<<< Updated upstream
                        <p>COMPONENTE CARD</p>
                    )}
=======
                            <CartaVacia></CartaVacia>
                        )}
>>>>>>> Stashed changes
                </div>
            )}

        </>
    );
}
