"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Texto from "@/Components/Texto";
import Button from "@/Components/Button";
import CardEleccion from "@/Estructuras/CardEleccion";
import Esperando from "../BattleComponents/Esperando";
import Juego from "./Juego/page";
import { useSocket } from "@/app/hooks/useSocket";
import Icon from "@/Components/Icon";

export default function futbolitosBattle() {
    const { socket, isConnected } = useSocket();
    const [cambio, setCambio] = useState(true);
    const toggleMode = () => setCambio(!cambio);
    const [jugadoresUser, setJugadoresUser] = useState([]);
    const [bloqueado, setBloqueado] = useState(false);
    const [equipo, setEquipo] = useState([]);
    const [mensajeEstado, setMensajeEstado] = useState("Elija sus cartas...");
    const [mensajeError, setMensajeError] = useState(false);
    const [contador, setContador] = useState(0);  

    const userID = localStorage.getItem("userID");
    const codigo = localStorage.getItem("codigoSalaBattle");

    async function PlayersDelUsuario() {
        const response = await fetch(`http://localhost:4000/PlayerXUserDetalles?userID=${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        const PlayerXUser = respuesta.map((Player) => ({
            PlayerId: Player.PlayerId,
            Nombre: Player.Nombre,
            Apellido: Player.Apellido,
            Nacionalidad: Player.Nacionalidad,
            Equipo: Player.Equipo,
            Posicion: Player.Posicion,
            Imagen: Player.Imagen,
            Ataque: Player.Ataque,
            Control: Player.Control,
            Defensa: Player.Defensa,
        }));
        console.log(PlayerXUser);
        setJugadoresUser(PlayerXUser);
    }

    const elijoEquipo = (playerID) => {
        setEquipo((prevEquipo) => {
            const newEquipo = [...prevEquipo];
            if (newEquipo.length === 3) {
                newEquipo.shift(); 
            }
            newEquipo.push(playerID);  
            return newEquipo;
        });
        console.log("Equipo: ", equipo);
    };

    // const elijoEquipo = (playerID) => {
    //     if (equipo.length === 3) {
    //         equipo.shift();
    //         equipo.push(playerID);
    //     } else {
    //         equipo.push(playerID);
    //     }
    //     console.log("Equipo: ", equipo);
    // };

    async function confirmarEquipo() {
        if (equipo.length !== 3) {
            setMensajeError(true);  
            return;
        }

        socket.emit("Estoy Listo", { Estado: 1, UserId: userID, room: codigo });
        setMensajeEstado("Esperando a... ");
        
        setContador((prevContador) => prevContador + 1); 
    }

    useEffect(() => {
        if (!socket || !isConnected) return;

        if (isConnected) {
            socket.emit("joinRoom", { room: codigo });
        }

        const handleJugadoresListos = (data) => {
            if (data.UserId !== userID) {
                setContador((prevContador) => prevContador + 1); 
                setMensajeEstado("El otro... está LISTO");
            }
        };

        socket.on("Jugadores Listos", handleJugadoresListos);

        if (isConnected) {
            socket.emit('joinRoom', { room: codigo });
        }

        return () => {
            socket.off("Jugadores Listos", handleJugadoresListos);
        };
    }, [socket, isConnected]);

    useEffect(() => {
        if (contador === 2) {  
            console.log(equipo);
            toggleMode();  
            setBloqueado(true);  
        }
    }, [contador]); 

    useEffect(() => {
        PlayersDelUsuario();
    }, []);

    return (
        <section className={styles.Esperando}>
            <section className={styles.main}>
                {cambio ? (
                    <>
                        <div className={styles.divLogOut}>
                            <p className={styles.MensajeEstado}>{mensajeEstado}</p>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.informacion}>
                                <br />
                                <br />
                                <br />
                                <br />
                                <Texto variant="h2" text="Elige tu equipo" />
                                <Texto variant="p" text="Selecciona tres jugadores para que formen parte de tu baraja" />
                                <Texto variant="p" text="¡Cuando tengas tu equipo selecciona Confirmar!" />
                                <div className={styles.InfoBotones}>
                                    <Button
                                        variant="normal"
                                        text="Confirmar"
                                        onClick={confirmarEquipo}
                                        disabled={bloqueado}
                                    />
                                </div>
                                {mensajeError && (
                                    <div className={styles.Error}>
                                        <img src="/images/IconError.svg" width="100px" height="100px" />
                                        <Texto variant="pChico" text="Debes seleccionar tres jugadores para confirmar el equipo" />
                                    </div>
                                )}
                            </div>
                            <CardEleccion
                                Cadena={jugadoresUser}
                                onPlayerSelect={elijoEquipo}
                                equipo={equipo}
                            />
                        </div>
                    </>
                ) : (
                    <Juego EquipoDeTres={equipo}></Juego>
                )}
            </section>
        </section>
    );
}
