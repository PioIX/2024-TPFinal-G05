"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "@/Estructuras/Card";
import EleccionDraft from "@/Estructuras/EleccionDraft";
import StarRating from "@/Estructuras/StarRating";
import ResumenFantasy from "@/Estructuras/ResumenFantasy";

export default function FutbolitosDraft() {
    const [isVisible, setIsVisible] = useState(false);
    const [todosJugadores, setTodosJugadores] = useState([]);
    const [jugadorUno, setJugadorUno] = useState([]);
    const [cargando, setCargando] = useState(true);
    const toggleDropdown = () => { setIsVisible(!isVisible); };

    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [loRecibio, setLoRecibio] = useState(false);
    const [jugadoresDelEquipo, setJugadoresDelEquipo] = useState([]);
    const [jugadorFijoUno, setJugadorFijoUno] = useState(null);
    const [jugadoresCompletosDelEquipo, setJugadoresCompletosDelEquipo] = useState([])

    const [estadisticasFinales, setEstadisticasFinales] = useState(false);

    useEffect(() => {
        if (jugadorFijoUno) {
            setJugadoresDelEquipo(prevJugadores => [...prevJugadores, jugadorFijoUno]);
        }
    }, [jugadorFijoUno]);

    useEffect(() => {
        if (jugadorSeleccionado) {
            setJugadoresCompletosDelEquipo(prevJugadores => [...prevJugadores, jugadorSeleccionado]);
        }
    }, [jugadorSeleccionado]);

    function calcularMedia() {
        const medias = jugadoresDelEquipo;

        if (medias.length === 0) return 0;

        const suma = medias.reduce((acc, media) => acc + media, 0);
        const mediaTotal = suma / medias.length;

        return Math.ceil(mediaTotal);
    }

    const mediaEquipo = calcularMedia();
    console.log("La media del equipo es:", mediaEquipo);

    async function PlayersTodos() {
        const response = await fetch('http://10.1.5.136:3000/Player', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();

        console.log(respuesta);

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

        setTodosJugadores(PlayerXUser);
    }

    useEffect(() => {
        PlayersTodos();
        setTimeout(() => {
            setCargando(false);
        }, 1000);
    }, []);

    if (cargando) {
        return <div className={styles.divloader}><div className={styles.loader}></div></div>;
    }

    function obtenerMejorPorPosicion(posiciones) {
        if (!jugadoresCompletosDelEquipo || jugadoresCompletosDelEquipo.length === 0) return null;
        const jugadoresPorPosicion = jugadoresCompletosDelEquipo.filter(jugador =>
            posiciones.includes(jugador.Posicion)
        );
        if (jugadoresPorPosicion.length === 0) return null;
        const jugadoresConMedia = jugadoresPorPosicion.map(jugador => {
            const media = Math.ceil((jugador.Ataque + jugador.Control + jugador.Defensa) / 3);
            return { ...jugador, media };
        });
        return jugadoresConMedia.reduce((mejor, actual) => (actual.media > mejor.media ? actual : mejor));
    }
    
    const mejorDelantero = obtenerMejorPorPosicion(["DC", "EI", "ED"]); 
    const mejorDefensa = obtenerMejorPorPosicion(["DFC", "DFD", "DFI"]);
    const mejorMediocentro = obtenerMejorPorPosicion(["MC"]); 

    function calcularPromedioPorGrupo(posiciones) {
        if (!jugadoresCompletosDelEquipo || jugadoresCompletosDelEquipo.length === 0) return 0;
    
        // Filtrar jugadores que pertenezcan a las posiciones dadas
        const jugadoresGrupo = jugadoresCompletosDelEquipo.filter(jugador =>
            posiciones.includes(jugador.Posicion)
        );
    
        if (jugadoresGrupo.length === 0) return 0;
    
        // Calcular la media de cada jugador del grupo
        const medias = jugadoresGrupo.map(jugador => {
            return Math.ceil((jugador.Ataque + jugador.Control + jugador.Defensa) / 3);
        });
    
        // Calcular el promedio del grupo
        const suma = medias.reduce((acc, media) => acc + media, 0);
        return (suma / medias.length).toFixed(2); // Redondear a 2 decimales
    }
    
    const valueDefensa = calcularPromedioPorGrupo(["DFC", "DFD", "DFI"]);
    const valueControl = calcularPromedioPorGrupo(["MC"]);
    const valueAtaque = calcularPromedioPorGrupo(["DC", "EI", "ED"]);
    
    // Mostrar los resultados en consola
    console.log("Promedio de defensas:", valueDefensa);
    console.log("Promedio de medios:", valueControl);
    console.log("Promedio de atacantes:", valueAtaque);

    function listo () {
        if (jugadoresCompletosDelEquipo.length === 11) {
            setEstadisticasFinales(true);
        } else {
            alert(`Selecciona 11 jugadores para continuar. Actualmente tienes ${jugadoresCompletosDelEquipo.length}.`);
        }
        
    }
    
    
    
    

    return (
        <>
            <section>
                {!estadisticasFinales && (
                    <>
                        <div className={styles.Horizontal}>
                            <div className={styles.Vertical}>
                                <div className={styles.Jugador}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="PO" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador), setLoRecibio(true) }} cartaADibujar={jugadorSeleccionado} loRecibio={loRecibio}></EleccionDraft>
                                </div>
                            </div>
                            <div className={styles.Vertical}>
                                <div className={styles.Jugador} >
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="DFI" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} cartaADibujar={jugadorSeleccionado} loRecibio={loRecibio}></EleccionDraft>
                                </div>
                                <div className={styles.Jugador}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="DFC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                                </div>
                                <div className={styles.Jugador}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="DFC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                                </div>
                                <div className={styles.Jugador}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="DFD" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                                </div>
                            </div>
                            <div className={styles.Vertical}>
                                <div className={styles.Jugador}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="MC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                                </div>
                                <div className={styles.Mco}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="MC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }}></EleccionDraft>
                                </div>
                                <div className={styles.Jugador}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="MC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                </div>
                            </div>
                            <div className={styles.Vertical}>
                                <div className={styles.Extremos}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="EI" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                </div>
                                <div className={styles.Delantero}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="DC" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                </div>
                                <div className={styles.Extremos}>
                                    <EleccionDraft jugadorUno={(jugador) => { setJugadorFijoUno(jugador) }} posicion="ED" jugadorSeleccionado={(jugador) => { setJugadorSeleccionado(jugador) }} ></EleccionDraft>
                                </div>
                            </div>
                        </div>
                        <div className={styles.divLogOutTres}>
                            <StarRating rating={mediaEquipo}></StarRating>
                        </div>

                        <div className={styles.divLogOutDos} onClick={listo}>
                            <p>LISTO</p>
                        </div>

                    </>
                )}

                {estadisticasFinales && (
                    <>
                       <ResumenFantasy Delantero={mejorDelantero} Defensa={mejorDefensa} MedioCentro={mejorMediocentro} mediaEquipo={mediaEquipo} valueAtaque={valueAtaque} valueDefensa={valueDefensa} valueControl={valueControl}></ResumenFantasy>
                    </>
                    
                )}
                {/*<div>
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
                            <button onClick={toggleDropdown} className={styles.button}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg></button>
                        )}
                    </div>
                </div> */}
            </section>
        </>
    );
}
