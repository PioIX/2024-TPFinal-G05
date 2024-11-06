"use client"
import { useEffect, useState } from "react";
import styles from "./RankingTable.module.css"

export default function RankingTable({ cadenaUsuarios }) {
    const [usersId, setUsersId] = useState([])

    var userID = cadenaUsuarios.map((usuario) => (
        userIdentifi: usuario.idUsuario

    ));
    console.log(usersId)

    async function UsernameXuseId() {

        const response = await fetch(`http://localhost:4000/PlayerXUserDetalles?userID=${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        // console.log(respuesta);
        return respuesta
    }

    useEffect(() => {
        UsernameXuseId()
    }, [])
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
                    {cadenaUsuarios.map((usuario, index) => (
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

