"use client"
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
	// const { socket, isConnected } = useSocket();
	const [cambio, setCambio] = useState(true); 
	const toggleMode = () => setCambio(!cambio);
	const [jugadoresUser, setJugadoresUser] = useState([])
	const [bloqueado, setBloqueado] = useState(false)
	const [equipo, setEquipo] = useState([])

	const [mensajeError, setMensajeError] = useState(false)

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

	const elijoEquipo = (playerID) => {
		if (equipo.length === 3) {
			equipo.shift();
			equipo.push(playerID);
		} else {
			equipo.push(playerID);
		}
		console.log("Equipo: ", equipo);
	};

	async function confirmarEquipo() {
		if (equipo.length !== 3) { return setMensajeError(true) }
		console.log(equipo)
		toggleMode();
		setBloqueado(true);
	}

	// useEffect(() => {
    //     if (!socket || !isConnected) return;
    //     PlayersDelUsuario();

	// 	const codigo = localStorage.getItem("codigoSalaBattle");
	// 	if (isConnected) {
    //         socket.emit('joinRoom', { room: codigo });
    //     }
    
    // }, [socket, isConnected]);  

	useEffect(()=> {
		PlayersDelUsuario();
	}, [])       //// UNIRSE ALA SALA --> VER CUANDO ES CONVENIENTE

	return (
		<section className={styles.main}>
			{cambio ? (
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
							<Button variant="normal" text="Confirmar" onClick={confirmarEquipo} disabled={bloqueado} />
						</div>
						{mensajeError && (
							<>
								<div className={styles.Error}>
									<img src="/images/IconError.svg" width="100px" height="100px"></img>
									<Texto variant="pChico" text="Debes seleccionar tres jugadores para confirmar el equipo" />
								</div>
							</>

						)}
					</div>
					<CardEleccion
						Cadena={jugadoresUser}
						onPlayerSelect={elijoEquipo}
						equipo = {equipo}
					/>
				</div>
			) : (
				// <Esperando />
				<Juego EquipoDeTres = {equipo}></Juego>
			)}

		</section>
	);
}	