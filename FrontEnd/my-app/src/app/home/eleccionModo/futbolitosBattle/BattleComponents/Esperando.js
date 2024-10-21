"use client"

import Texto from "@/Components/Texto"
import styles from "./Esperando.module.css"

export default function Esperando({codigoDeLaSala}) {
    return (
        <section className={styles.pagina}>
            <div className={styles.container}>
                <Texto variant="NavTitle" text="Espere al jugador"></Texto>
                <span className={styles.loader}></span>
            </div>
            <Texto variant = "h2" text = {codigoDeLaSala}></Texto>
        </section>
    )
}