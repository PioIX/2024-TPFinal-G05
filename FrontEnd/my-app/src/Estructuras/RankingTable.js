"use client";

import { useEffect, useState } from "react";
import styles from "./RankingTable.module.css";

export default function RankingTable({ cadenaUsuarios }) {
    const [usersData, setUsersData] = useState([]); // Estado para almacenar los datos recibidos

    function getUserIds() {
        return cadenaUsuarios.map(usuario => usuario.idUsuario);
    }
    
    async function UsernameXuseId() {
        const userIds = getUserIds();
        console.log(userIds)
        const queryString = userIds.map(id => `userID=${id}`).join('&');
        console.log(queryString)
        
        try {
            const response = await fetch(`http://localhost:4000/PlayerXUserDetalles?${queryString}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const respuesta = await response.json();
            console.log(respuesta);
            setUsersData(respuesta); // Guardamos la respuesta en el estado
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        UsernameXuseId();
    }, []); // Ejecuta la función solo una vez al montar el componente

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>UserId</th>
                        <th className={styles.th}>Puntos</th>
                        <th className={styles.th}>Gana</th>
                        <th className={styles.th}>Pierde</th>
                        <th className={styles.th}>Empata</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.length > 0
                        ? usersData.map((usuario, index) => (
                            <tr className={styles.tr} key={index}>
                                <td className={styles.td}>{usuario.idUsuario}</td>
                                <td className={styles.td}>{usuario.puntosUsuario}</td>
                                <td className={styles.td}>{usuario.ganaUsuario}</td>
                                <td className={styles.td}>{usuario.pierdeUsuario}</td>
                                <td className={styles.td}>{usuario.empataUsuario}</td>
                            </tr>
                        ))
                        : cadenaUsuarios.map((usuario, index) => (
                            <tr className={styles.tr} key={index}>
                                <td className={styles.td}>{usuario.idUsuario}</td>
                                <td className={styles.td}>{usuario.puntosUsuario}</td>
                                <td className={styles.td}>{usuario.ganaUsuario}</td>
                                <td className={styles.td}>{usuario.pierdeUsuario}</td>
                                <td className={styles.td}>{usuario.empataUsuario}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
