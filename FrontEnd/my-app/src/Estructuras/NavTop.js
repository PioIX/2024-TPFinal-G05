"use client"

import Texto from "@/Components/Texto"
import Card from "./Card"
import styles from "./NavTop.module.css"
import Button from "@/Components/Button"
import Link from "next/link"
import Icon from "@/Components/Icon"

export default function NavTop(nombreEquipoUsuario, onClick) {
    return (
        <div className={styles.Nav}>
            <div className = {styles.prim}> 
            <Link href="/."><Icon variant="Nav" srcImg={"/images/LogOut.svg"}></Icon></Link>
                <Texto variant="NavTitle" text="Futbolitos"></Texto>
            </div>
            <div className={styles.botones}>
                <Link href="/home/guia"><button className={styles.Guia}>Guia</button></Link>
                <Link href="/home/cartas"><button className={styles.Guia}>Cartas</button></Link>
                <Link href="/home/ranking"><button className={styles.Guia}>Ranking</button></Link>
                <Link href="/home/eleccionModo"><button className={styles.Jugar}>Jugar</button></Link>
            </div>
        </div>
    )
}
