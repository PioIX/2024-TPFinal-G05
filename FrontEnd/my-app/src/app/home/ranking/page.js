"use client"
import { useEffect, useState } from "react";
import RankingTable from "@/Estructuras/RankingTable";
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";

export default function Ranking() {
    const [rankingUser, setRankingUser] = useState([]);
    const { socket, isConnected } = useSocket();
    
    async function rankingUsuario() {
        const response = await fetch(`http://localhost:4000/Ranking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        const rankingXplayer = respuesta.map(rankingUsuario => ({
            UserName: rankingUsuario.userName,  
            puntosUsuario: rankingUsuario.Puntos,
            ganaUsuario: rankingUsuario.PartidasGanadas,
            pierdeUsuario: rankingUsuario.PartidasPerdidas,
            empataUsuario: rankingUsuario.PartidasEmpatadas,
        }));
        setRankingUser(rankingXplayer);
    }

    useEffect(() => {
        rankingUsuario();
    }, []);
    function mandarMensaje(){
        socket.emit('joinRoom',{room: "ala"} )
        socket.emit('mensaje', {ranking: "ranking.userId", codigo: "ala"})
    }

    // Ordenar los usuarios por puntos de mayor a menor
    const sortedRankingUser = [...rankingUser].sort((a, b) => b.puntosUsuario - a.puntosUsuario);
    
    useEffect(() => {
        if (!socket || !isConnected) return;
        socket.on('mensajeDos', data =>{
            console.log(data.mesajeFeli, data.codigo)
        })
    }, [socket, isConnected]);

    return (
        <>
            <h1 className={styles.titulo}>Ranking</h1>
            <RankingTable cadenaUsuarios = {sortedRankingUser} />
            <button onClick={mandarMensaje}>aaaaaaaaa</button>
        </>
    );
}


// SOCKET ON TIENE TRES PARTES, NOMBRE(NOMBRE DEL MENSAJE(QUE NO ES NECESARIAMENTE UN MENSAJE) 'CULO'), CONTENIDO(ESTO ES LO QUE RECIBIS) Y BLOQUE DE COMANDO(ESTO ES LO QUE HACES(=>))