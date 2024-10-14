"use client"

import CardTable from "@/Estructuras/CardTable";
import styles from "./page.module.css";
import Texto from "@/Components/Texto";
import Button from "@/Components/Button";

export default function Cartas() {

    return (
        <main className = {styles.main}>
            <div className = {styles.informacion}>
                <Texto></Texto>
                <Texto></Texto>
                <div className={styles.InfoBotones}>
                    <Button variant = "normal" text = "Mis cartas"></Button>
                    <Button variant = "normal" text = "Cartas Futbolito"></Button>
                </div>
            </div>
            {/* <CardTable
            
            ></CardTable> */}
        </main>
    )
}