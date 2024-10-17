"use client"

import Texto from "@/Components/Texto"
import Card from "./Card"
import styles from "./NavTop.module.css"
import Button from "@/Components/Button"
import Link from "next/link"

export default function NavTop(nombreEquipoUsuario) {
    return (
        <div className = {styles.Nav}>
            <h2 className = {styles.titulo}>nombreEquipoUsuario</h2>
            <div className={styles.botones}>
                <Link href = "/home/guia"><button className = {styles.Guia}>Guia</button></Link>
                <Link href = "/home/cartas"><button className = {styles.Guia}>Cartas</button></Link>
                <Link href = "/home/ranking"><button className = {styles.Guia}>Ranking</button></Link>
                <Link href = "/home/eleccionModo"><button className = {styles.Jugar}>Jugar</button></Link>
            </div>
        </div>
    )
}