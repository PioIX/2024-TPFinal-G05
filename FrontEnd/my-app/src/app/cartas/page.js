"use client"

import CardTable from "@/Estructuras/CardTable";
import styles from "./page.module.css";

export default function Cartas() {

    return (
        <main className = {styles.main}>
            <div className = {styles.informacion}></div>
            <CardTable
            
            ></CardTable>
        </main>
    )
}