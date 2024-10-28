"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Texto from "@/Components/Texto";
import Button from "@/Components/Button";
import CardTable from "@/Estructuras/CardTable";
import CardEleccion from "@/Estructuras/CardEleccion";


export default function futbolitosBattle() {
	const [cambio, setCambio] = useState(true);
	const toggleMode = () => setCambio(!cambio);
	const [jugadoresUser, setJugadoresUser] = useState([])
	const [bloqueado, setBloqueado] = useState(false)
	const [mensajeDeEsperar, setMensajeDeEsperar] = useState(false)
	const [equipo, setEquipo] = useState([])

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
	function confirmarEquipo() {
		if (equipo.length !== 3) { return alert("Debes seleccionar tres jugadores para confirmar el equipo"); }
		console.log(equipo)
		setBloqueado(true);
	}

	useEffect(() => {
		PlayersDelUsuario();
	}, []);

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
					</div>
					<CardEleccion
						Cadena={jugadoresUser}
						onPlayerSelect={elijoEquipo}
					/>
				</div>
			) : (
				<Esperando codigoDeLaSala={codigoActual} />
			)}

		</section>
	);
}	