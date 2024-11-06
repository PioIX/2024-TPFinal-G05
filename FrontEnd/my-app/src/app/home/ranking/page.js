"use client"
import { useEffect, useState } from "react";
import RankingTable from "@/Estructuras/RankingTable";
import styles from "./page.module.css";

export default function Ranking() {
    const [rankingUser, setRankingUser] = useState([]);
    
    async function rankingUsuario() {
        const response = await fetch(`http://localhost:4000/Ranking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        const rankingXplayer = respuesta.map(rankingUsuario => ({
            idUsuario: rankingUsuario.UserId,
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
    
    // Ordenar los usuarios por puntos de mayor a menor
    const sortedRankingUser = [...rankingUser].sort((a, b) => b.puntosUsuario - a.puntosUsuario);

    return (
        <>
            <h1 className={styles.titulo}>Ranking</h1>
            <RankingTable cadenaUsuarios={sortedRankingUser} />
        </>
    );
}
