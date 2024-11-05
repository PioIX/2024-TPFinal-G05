"use client";
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";
import Card from "@/Estructuras/Card";
import CardBattle from "@/Estructuras/CardBattle";
import Texto from "@/Components/Texto";

export default function Juego({ EquipoDeTres }) {
    const { socket, isConnected } = useSocket();

    const codigo = localStorage.getItem("codigoSalaBattle");
    const userId = localStorage.getItem("userID");

    const [jugadores, setJugadores] = useState([]);
    const [muestroEquipo, setMuestroEquipo] = useState(true)

    const [puntaje, setPuntaje] = useState(false)
    const [puntosMios, setPuntosMios] = useState(0)
    const [puntosOponente, setPuntosOponente] = useState(0)

    const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
    const [yoElijo, setYoElijo] = useState(false)

    const [tipoEstadisticaOponente, setTipoEstadisticaOponente] = useState()
    const [cartaOponente, setCartaOponente] = useState({});
    const [userOponente, setUserOponente] = useState()
    const [eligioOponente, setEligioOponente] = useState(false)

    const [tipoDefensa, setTipoDefensa] = useState(false);
    const [tipoAtaque, setTipoAtaque] = useState(false);
    const [tipoControl, setTipoControl] = useState(false);

    const [estadisticaOponente, setEstadisticaOponente] = useState()
    const [estadisticaPropia, setEstadisticaPropia] = useState()

    useEffect(() => {
        if (!socket || !isConnected) return;
        obtenerEquipo();
        socket.on('Estadistica', data => {
            console.log(data.room, data.Estadistica, data.userId, data.tipo)
            if (data.userId != userId && data.elijo === true) {
                setCartaOponente(data.cartaOponente)
                setTipoEstadisticaOponente(data.tipo)
                setEstadisticaOponente(data.Estadistica)
                setUserOponente(data.userId)
                setEligioOponente(data.elijo)
            }
        });
    }, [socket, isConnected]);

    useEffect(() => {
        if (eligioOponente && yoElijo) {
            if (tipoEstadisticaOponente === "Ataque") {
                setTipoAtaque(true);
                setTipoDefensa(false);
                setTipoControl(false);
            } else if (tipoEstadisticaOponente === "Defensa") {
                setTipoAtaque(false);
                setTipoDefensa(true);
                setTipoControl(false);
            } else if (tipoEstadisticaOponente === "Control") {
                setTipoAtaque(false);
                setTipoDefensa(false);
                setTipoControl(true);
            }
            setTimeout(() => {
                ganador()
            }, 2000);
        }
    }, [yoElijo, eligioOponente])

    useEffect(() => {
        // Verificar si alguno de los jugadores ha alcanzado 2 puntos
        if (puntosMios === 2 || puntosOponente === 2) {
            if (puntosMios > puntosOponente) {
                console.log("Gané la partida");
                actualizarPuntaje(userId, 3);
                // actualizarPuntaje(userOponente, 0);
            } else if (puntosOponente > puntosMios) {
                console.log("Perdí la partida");
                actualizarPuntaje(userId, 0);
                // actualizarPuntaje(userOponente, 3);
            } else if (puntosOponente === puntosMios) {
                console.log("Empatamos la partida");
                actualizarPuntaje(userId, 1);
                // actualizarPuntaje(userOponente, 1);
            }
    
            // Reiniciar los puntos para evitar múltiples actualizaciones
            // setPuntosMios(0);
            // setPuntosOponente(0);
        }
    }, [puntosMios, puntosOponente]);
    

    async function actualizarPuntaje(userId, nuevosPuntos) {
        const data = {
            userId: userId,
            nuevosPuntos: nuevosPuntos,
        };
    
        try {
            const response = await fetch('http://localhost:4000/EnvioPuntaje', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const result = await response.json();
            console.log("Puntaje actualizado:", result);
        } catch (error) {
            console.error("Error al actualizar el puntaje:", error);
            // Aquí podrías mostrar un mensaje de error al usuario.
        }
    }
    
    


    function ganador() {
        if (estadisticaPropia > estadisticaOponente) {
            setPuntosMios(puntosMios + 1)

            resetAll()
        } else if (estadisticaPropia < estadisticaOponente) {
            setPuntosOponente(puntosOponente + 1)

            resetAll()
        } else if (estadisticaPropia == estadisticaOponente) {
            setPuntosMios(puntosMios + 1)
            setPuntosOponente(puntosOponente + 1)

            resetAll()
        }
    }

    function resetAll() {
        setCartaSeleccionada(null)
        setTipoAtaque(false)
        setTipoControl(false)
        setTipoDefensa(false)
        setEstadisticaOponente(null)
        setCartaOponente(null)
        setPuntaje(true)
        setEligioOponente(false)
        setYoElijo(false)
    }

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

    function seleccionarJugador(jugador) {
        const indice = jugadores.indexOf(jugador);
        console.log(jugador);
        setPuntaje(false)
        setCartaSeleccionada(jugador);
        if (isConnected) {
            socket.emit('joinRoom', { room: codigo });
            console.log(codigo)
        }
        if (indice !== -1) {
            jugadores.splice(indice, 1);
        } else {
            console.log("El elemento no se encuentra en el array.");
        }
    }

    function EnvioEstadisticaElegida(estadistica, tipo) {
        console.log(estadistica)
        setYoElijo(true)
        socket.emit('EnvioEstadistica', { room: codigo, estadistica: estadistica, tipo: tipo, userId: userId, cartaOponente: cartaSeleccionada, elijo: true });
        setEstadisticaPropia(estadistica)

    }

    return (
        <section className={styles.main}>
            <div className={styles.Juego}>
                {puntaje && (
                    <div className={styles.TableroPuntaje}>
                        <Texto variant="h2" text={puntosMios}></Texto>
                        <Texto variant="h2" text=":"></Texto>
                        <Texto variant="h2" text={puntosOponente}></Texto>
                    </div>
                )}
                <div className={styles.carta}>
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
                            onClickAtaque={() => EnvioEstadisticaElegida(cartaSeleccionada.Ataque, "Ataque")}
                            onClickControl={() => EnvioEstadisticaElegida(cartaSeleccionada.Control, "Control")}
                            onClickDefensa={() => EnvioEstadisticaElegida(cartaSeleccionada.Defensa, "Defensa")}
                        />
                    )}
                </div>
                <div className={styles.carta}>
                    {tipoAtaque && (
                        <CardBattle
                            isSmall={false}
                            posicion={cartaOponente.Posicion}
                            nacionalidad={cartaOponente.Nacionalidad}
                            imagenJugador={cartaOponente.Imagen}
                            escudo={cartaOponente.Equipo}
                            nombreJugador={cartaOponente.Apellido}
                            onChangeEstadistica={tipoEstadisticaOponente}
                            ataque={cartaOponente.Ataque}
                        />
                    )}
                    {tipoControl && (
                        <CardBattle
                            isSmall={false}
                            posicion={cartaOponente.Posicion}
                            nacionalidad={cartaOponente.Nacionalidad}
                            imagenJugador={cartaOponente.Imagen}
                            escudo={cartaOponente.Equipo}
                            nombreJugador={cartaOponente.Apellido}
                            control={estadisticaOponente}
                            onChangeEstadistica={tipoEstadisticaOponente}
                        />
                    )}
                    {tipoDefensa && (
                        <CardBattle
                            isSmall={false}
                            posicion={cartaOponente.Posicion}
                            nacionalidad={cartaOponente.Nacionalidad}
                            imagenJugador={cartaOponente.Imagen}
                            escudo={cartaOponente.Equipo}
                            nombreJugador={cartaOponente.Apellido}
                            defensa={cartaOponente.Defensa}
                            onChangeEstadistica={tipoEstadisticaOponente}
                        />
                    )}
                </div>
            </div>
            {muestroEquipo && (
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
            )}
        </section>
    );
}
