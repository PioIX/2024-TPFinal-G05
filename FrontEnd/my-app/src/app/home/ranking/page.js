"use client"

import RankingTable from "@/Estructuras/RankingTable"
import { useState } from "react";

export default function Ranking() {
const [rankingUser, setRankingUser] = useState
    return (
        <>
            <h1>Ranking</h1>
            <RankingTable cadenaUsuarios={rankingUser}/>
            
        </>
    )

    async function rankingUsuario() {
        const response = await fetch(`http://localhost:4000/Ranking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        const rankingXplayer = respuesta.map(rankingUsuario => ({
            idUsuario: rankingUsuario.IdUsuario,
            username: rankingUsuario.Username,
            puntosUsuario: rankingUsuario.Puntos,
            ganaUsuario: rankingUsuario.partidasGanadas,
            pierdeUsuario: rankingUsuario.partidasPerdidas,
            empataUsuario: rankingUsuario.PartidasEmpatas,
            }));
        console.log(rankingXplayer)
        setRankingUser(rankingXplayer);
    }
    
}

