"use client";

import { useEffect, useState } from "react";
import styles from "./EleccionDraft.module.css";
import Card from "./Card";
import Button from "@/Components/Button";
import CartaVacia from "@/Components/CartaVacia";
import 'animate.css';
import { getDisplayName } from "next/dist/shared/lib/utils";
import CardFantasy from "./CardFantasy";

export default function EleccionDraft({ posicion, jugadorSeleccionado, cartaADibujar, loRecibio, setJugadorUnoFront }) {
    const [jugadoresId, setJugadoresId] = useState([])
    const [abrio, setAbrio] = useState(false);
    const [desvanecer, setDesvanecer] = useState(false);
    const [cincoJugadores, setCincoJugadores] = useState([]);
    const [jugadoresUser, setJugadoresUser] = useState([]);
    const [jugadoresTodos, setJugadoresTodos] = useState([])
    const [otraFuncion, setOtraFuncion] = useState(false)

    const [cartaVacia, setCartaVacia] = useState(true)

    const [JugadorUnoEstado, setJugadorUnoEstado] = useState(false)
    const [JugadorUno, setJugadorUno] = useState([]);
    const [jugadorInicial, setJugadorInicial] = useState(null)
    const [cambio, setCambio] = useState(null)
    const [quieroCambiar, setQuieroCambiar] = useState(false)

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
        const jugadoresFiltrados = jugadores.filter((player) => player.Posicion === posicion);
        console.log(`Jugadores disponibles para la posición "${posicion}":`, jugadoresFiltrados);

        if (jugadoresFiltrados.length < 5) {
            alert("No hay suficientes jugadores disponibles para esta posición.");
            return;
        }

        const barajar = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const jugadoresAleatorios = barajar(jugadoresFiltrados).slice(0, 5);
        setCincoJugadores(jugadoresAleatorios);

        console.log("IDs de los jugadores aleatorios:", jugadoresAleatorios.map((player) => player.PlayerId));
    }

    useEffect(() => {
        if (jugadoresTodos.length === 0) {
            PlayersTodos();
        }
    }, [jugadoresTodos]);  // Asegúrate de no ejecutar más de una vez si ya hay datos.

    const handleClick = () => {
        if (!cincoJugadores.length) {  // Asegúrate de no llamar a AbroSobres repetidamente.
            AbroSobres(jugadoresTodos);
        }
        setDesvanecer(true);
        setTimeout(() => {
            setAbrio(true);
            // No volver a actualizar el estado si ya está en el estado esperado.
        }, 500);
    };

    function seleccionarJugador(jugador) {
        // if (jugadorSeleccionado) {
        //     jugadorSeleccionado(jugador);
        // }
        console.log(jugador)
        setJugadorUno(jugador)
        setJugadorUnoEstado(true)
        setAbrio(false)
        setCartaVacia(false)
        setOtraFuncion(true)
        setJugadorUnoFront(jugador)
    }

    function jugadorACambiar(jugador) {
        jugadorSeleccionado(jugador);
        setJugadorInicial(jugador)
    }




    useEffect(() => {
        if (cartaADibujar) {
            setCambio(cartaADibujar)
            setJugadorUno(null)
        } else {
            setCambio(cartaADibujar)
            setJugadorUno(null)
        }
        console.log("aa")
        console.log("Jugador que Seleccione ", jugadorInicial)
        console.log( "Jugador Que va a rotar (el segundo Click) ", cartaADibujar)
    }, [])



    // useEffect (()=>{
    //     if(cartaADibujar && posicionADibujar){
    //         setJugadorUno(cartaADibujar)
    //     }
    // }, [cartaADibujar, posicionADibujar])

    return (
        <>
            {otraFuncion && (
                <>
                    {JugadorUno && (
                        <>
                            
                            <CardFantasy
                            isSmall={true}
                            posicion={JugadorUno.Posicion}
                            nacionalidad={JugadorUno.Nacionalidad}
                            imagenJugador={JugadorUno.Imagen}
                            escudo={JugadorUno.Equipo}
                            nombreJugador={JugadorUno.Apellido}
                            ataque={JugadorUno.Ataque}
                            control={JugadorUno.Control}
                            defensa={JugadorUno.Defensa}
                            onClick={() => jugadorACambiar(JugadorUno)}
                            ></CardFantasy>
                        </>
                    )}
                    {cambio && (
                        <>
                            <CardFantasy
                                isSmall={true}
                                posicion={cambio.Posicion}
                                nacionalidad={cambio.Nacionalidad}
                                imagenJugador={cambio.Imagen}
                                escudo={cambio.Equipo}
                                nombreJugador={cambio.Apellido}
                                ataque={cambio.Ataque}
                                control={cambio.Control}
                                defensa={cambio.Defensa}
                                onClick={() => jugadorACambiar(cambio)}
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
                        <div className={styles.divConjuntoCartaBox}>
                            <div className={styles.ConjuntoCartas}>

                                {cincoJugadores.map((jugador, index) => (
                                    <div
                                        key={jugador.PlayerId}
                                        className={`animate__animated animate__fadeIn ${styles.laCarta}`}
                                        style={{ animationDelay: `${index * 0.5}s` }}
                                    >
                                        <CardFantasy
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
                            <CartaVacia></CartaVacia>
                        )}
                </div>
            )}

        </>
    );
}
