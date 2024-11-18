"use client";
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState } from "react";
import Card from "@/Estructuras/Card";
import CardBattle from "@/Estructuras/CardBattle";
import Texto from "@/Components/Texto";
import MensajeFin from "../../BattleComponents/MensajeFin";

export default function Juego({ EquipoDeTres }) {
    const { socket, isConnected } = useSocket();
    const codigo = localStorage.getItem("codigoSalaBattle");
    const userId = localStorage.getItem("userID");

    const [jugadores, setJugadores] = useState([]);
    const [muestroEquipo, setMuestroEquipo] = useState(true);
    const [muestroFin, setMuestroFin] = useState(false);
    const [result, setResult] = useState("");
    const [puntaje, setPuntaje] = useState(false);
    const [puntosMios, setPuntosMios] = useState(0);
    const [puntosOponente, setPuntosOponente] = useState(0);
    const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
    const [yoElijo, setYoElijo] = useState(false);
    const [tipoEstadisticaOponente, setTipoEstadisticaOponente] = useState();
    const [cartaOponente, setCartaOponente] = useState({});
    const [userOponente, setUserOponente] = useState();
    const [eligioOponente, setEligioOponente] = useState(false);
    const [tipoDefensa, setTipoDefensa] = useState(false);
    const [tipoAtaque, setTipoAtaque] = useState(false);
    const [tipoControl, setTipoControl] = useState(false);
    const [estadisticaOponente, setEstadisticaOponente] = useState();
    const [estadisticaPropia, setEstadisticaPropia] = useState();

    const [mensajeEstado, setMensajeEstado] = useState("Elija un Jugador...");

    useEffect(() => {
        if (!socket || !isConnected) return;

        obtenerEquipo();

        if (isConnected) {
            socket.emit('joinRoom', { room: codigo });
        }

        socket.on('Estadistica', data => {
            if (data.userId === userId && data.elijo === true) {
                setYoElijo(true)
            }
            if (data.userId !== userId && data.elijo === true) {
                setCartaOponente(data.cartaOponente);
                setTipoEstadisticaOponente(data.tipo);
                setEstadisticaOponente(data.Estadistica);
                setUserOponente(data.userId);
                setEligioOponente(data.elijo);
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

            // Espera 2 segundos antes de determinar el ganador
            setTimeout(() => {
                ganador();
            }, 4000);
        }
    }, [yoElijo, eligioOponente, tipoEstadisticaOponente]);

    useEffect(() => {
        if (puntosMios === 2 || puntosOponente === 2) {
            if (puntosMios > puntosOponente) {
                setResult("Ganaste");
                setMuestroFin(true);
                actualizarPuntaje(userId, 3);
            } else if (puntosOponente > puntosMios) {
                setResult("Perdiste");
                setMuestroFin(true);
                actualizarPuntaje(userId, 0);
            } else if (puntosOponente === puntosMios) {
                setResult("Empataste");
                setMuestroFin(true);
                actualizarPuntaje(userId, 1);
            }
            resetAll();
        }
    }, [puntosMios, puntosOponente]);

    // Función para actualizar el puntaje
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
        }
    }

    function ganador() {
        if (estadisticaPropia > estadisticaOponente) {
            setPuntosMios(puntosMios + 1);
            resetAll();
        } else if (estadisticaPropia < estadisticaOponente) {
            setPuntosOponente(puntosOponente + 1);
            resetAll();
        } else if (estadisticaPropia === estadisticaOponente) {
            setPuntosMios(puntosMios + 1);
            setPuntosOponente(puntosOponente + 1);
            resetAll();
        }
        setMensajeEstado("Seleccione una carta para Continuar...");
    }

    function resetAll() {
        setCartaSeleccionada(null);
        setTipoAtaque(false);
        setTipoControl(false);
        setTipoDefensa(false);
        setEstadisticaOponente(null);
        setCartaOponente(null);
        setPuntaje(true);
        setEligioOponente(false);
        setYoElijo(false);
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
        } catch (error) {
            console.error("Error al obtener el equipo:", error);
        }
    }

    function seleccionarJugador(jugador) {
        const indice = jugadores.indexOf(jugador);
        setPuntaje(false);
        setCartaSeleccionada(jugador);
        if (indice !== -1) {
            jugadores.splice(indice, 1);
        }
        setMensajeEstado("Seleccione una Estadistica...");
    }

    function EnvioEstadisticaElegida(estadistica, tipo) {
        console.log(tipo)
        setYoElijo(true);
        setMensajeEstado(`Has Elegido ${tipo}...`);

        socket.emit('EnvioEstadistica', { room: codigo, estadistica: estadistica, tipo: tipo, userId: userId, cartaOponente: cartaSeleccionada, elijo: true });
        setEstadisticaPropia(estadistica);
    }

    return (
        <section className={styles.main}>
            {muestroFin ? (
                <MensajeFin resultado={result} />
            ) : (
                <>
                    <div className={styles.divLogOut}>
                        <p className={styles.MensajeEstado}>{mensajeEstado}</p>
                    </div>
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
                                    estadDisabled={true}
                                />
                            )}
                        </div>
                        {(tipoAtaque || tipoControl || tipoDefensa) && (
                            <div className={`${styles.versus} ${styles.aparece}`}>
                                <Texto variant="h2" text="VS"></Texto>
                            </div>
                        )}
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
                                    defensa={cartaOponente.Defensa}
                                    ataque={cartaOponente.Ataque}
                                    control={cartaOponente.Control}
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
                                    defensa={cartaOponente.Defensa}
                                    ataque={cartaOponente.Ataque}
                                    control={cartaOponente.Control}
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
                                    ataque={cartaOponente.Ataque}
                                    control={cartaOponente.Control}
                                    onChangeEstadistica={tipoEstadisticaOponente}
                                />
                            )}
                        </div>
                    </div>
                    {muestroEquipo && (
                        <div id="Cards" className={styles.Cards}>
                            {jugadores.map((jugador) => (
                                <Card
                                    isSmall={true}
                                    posicion={jugador.Posicion}
                                    nacionalidad={jugador.Nacionalidad}
                                    imagenJugador={jugador.Imagen}
                                    escudo={jugador.Equipo}
                                    nombreJugador={jugador.Apellido}
                                    ataque={jugador.Ataque}
                                    control={jugador.Control}
                                    defensa={jugador.Defensa}
                                    onClick={cartaSeleccionada ? undefined : () => seleccionarJugador(jugador)} // Deshabilita el onClick si hay un jugador seleccionado
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
