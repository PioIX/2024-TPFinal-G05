"use client"

import { useEffect, useState } from "react"
import Card from "./Card"
import styles from "./CardTableDraft.module.css"
import EleccionDraft from "./EleccionDraft"

export default function CardTableDraft({

}) {

    // useEffect(() => {
    //     setJugadorUnoEstado(true)
    // }, [JugadorUno]);



    return (
        <>
            <div className={styles.Horizontal}>
                <div className={styles.Vertical}>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                </div>
                <div className={styles.Vertical}>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                </div>
                <div className={styles.Vertical}>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Mco}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Jugador}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                </div>
                <div className={styles.Vertical}>
                    <div className={styles.Extremos}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Delantero}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                    <div className={styles.Extremos}>
                        <EleccionDraft></EleccionDraft>
                    </div>
                </div>
            </div>
        </>
    )
}