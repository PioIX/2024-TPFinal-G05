"use client";
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";
import Card from "@/Estructuras/Card";
import CardBattle from "@/Estructuras/CardBattle";

export default function Juego({ EquipoDeTres }) {
    const { socket, isConnected } = useSocket();
    const codigo = localStorage.getItem("codigoSalaBattle");
    const userId = localStorage.getItem("userID");
    const [jugadores, setJugadores] = useState([]);

    const [cartaSeleccionada, setCartaSeleccionada] = useState(null); 

    const [mostraCartaOponente, setMostrarCartaOponente] = useState(false);
    const [cartaOponente, setCartaOponente] = useState();

    const [estadisticaOponente, setEstadisticaOponente] = useState()
    const [estadisticaPropia, setEstadisticaPropia] = useState()


    useEffect(() => {
        if (!socket || !isConnected) return;

        socket.on('Estadistica', data => {
            console.log(data.room, data.Estadistica, data.userId)
            console.log(data.a)
            if (data.userId != userId) {

                setEstadisticaOponente(data.Estadistica)
                setMostrarCartaOponente(true)
            }
        });

    }, [socket, isConnected]);

    useEffect(() => { 
        async function obtenerEquipo() {
            const playersId = EquipoDeTres;
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
        // if (isConnected) {
        //     socket.emit('joinRoom', { room: codigo });
        //     console.log(codigo)
        // }

    }, []);

    function seleccionarJugador(jugador) {
        console.log(jugador);
        setCartaSeleccionada(jugador);
        if (isConnected) {
            socket.emit('joinRoom', { room: codigo });
            console.log(codigo)
        }
    }

    function EnvioEstadisticaElegida (estadistica){
        console.log(estadistica)
        socket.emit('EnvioEstadistica', { room: codigo, estadistica: estadistica, userId: userId, a:cartaSeleccionada});
        setEstadisticaPropia(estadistica)
    }

    return (
        <section className={styles.main}>
            <div className={styles.Juego}>
                <div>
                    {cartaSeleccionada && (
                        <CardBattle
                            isSmall={false}
                            posicion={cartaSeleccionada.Posicion}
                            nacionalidad={cartaSeleccionada.Nacionalidad}
                            imagenJugador={cartaSeleccionada.Imagen}
                            escudo={cartaSeleccionada.Equipo}
                            nombreJugador={cartaSeleccionada.Apellido}
                            ataque={cartaSeleccionada.Ataque}
                            control={cartaSeleccionada.Control}
                            defensa={cartaSeleccionada.Defensa}
                            onClickAtaque={() => EnvioEstadisticaElegida(cartaSeleccionada.Ataque)}
                            onClickControl={() => EnvioEstadisticaElegida(cartaSeleccionada.Control)}
                            onClickDefensa={() => EnvioEstadisticaElegida(cartaSeleccionada.Defensa)}
                        />
                    )}
                </div>
                <div>
                    {mostraCartaOponente && (
                        <CardBattle
                            isSmall={false}
                            posicion={cartaSeleccionada.Posicion}
                            nacionalidad={cartaSeleccionada.Nacionalidad}
                            imagenJugador={cartaSeleccionada.Imagen}
                            escudo={cartaSeleccionada.Equipo}
                            nombreJugador={cartaSeleccionada.Apellido}
                            ataque={cartaSeleccionada.Ataque}
                            control={cartaSeleccionada.Control}
                            defensa={cartaSeleccionada.Defensa}
                            onClickAtaque={() => console.log(cartaSeleccionada.Ataque)}
                            onClickControl={() => console.log(cartaSeleccionada.Control)}
                            onClickDefensa={() => console.log(cartaSeleccionada.Defensa)}
                        />
                    )}
                </div>
            </div>
            <div id="Cards" className={styles.Cards}>
                {jugadores.map((jugador) => (
                    <Card
                        key={jugador.Id}
                        isSmall={true}
                        posicion={jugador.Posicion}
                        nacionalidad={jugador.Nacionalidad}
                        imagenJugador={jugador.Imagen}
                        escudo={jugador.Equipo}
                        nombreJugador={jugador.Apellido}
                        ataque={jugador.Ataque}
                        control={jugador.Control}
                        defensa={jugador.Defensa}
                        onClick={cartaSeleccionada ? undefined : () => seleccionarJugador(jugador)} // Deshabilita el onClick si hay un jugador seleccionado //  setCartaSeleccionada(null);
                    />
                ))}
            </div>
        </section>
    );
}
