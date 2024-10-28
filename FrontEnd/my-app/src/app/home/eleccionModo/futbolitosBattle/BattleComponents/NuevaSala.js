"use client"

import Texto from "@/Components/Texto"
import styles from "./NuevaSala.module.css"
import Button from "@/Components/Button"
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Socket } from "socket.io-client";
import Link from "next/link";
import Icon from "@/Components/Icon";

export default function NuevaSala({ onChange, codigoSala, onClick }) {

    return (
        <section className={styles.pagina}>
            <div className={styles.container}>
                <div className={styles.containerAdvise}>
                    <Texto variant="NavTitle" text="Crear Sala"></Texto>
                    <Texto variant="p" text="Ingrese el codigo de sala deseado, o crea una sala"></Texto>
                    <div className={styles.interaccion}>
                        <input className={styles.input} onChange={onChange} value={codigoSala} placeholder="Codigo" />
                        <button className={styles.btn} onClick={onClick}>Crear</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
