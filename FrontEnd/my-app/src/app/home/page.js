"use client";

import Card from "@/Estructuras/Card";
import Button from "../../Components/Button";
import Texto from "../../Components/Texto";
import styles from "./page.module.css"
import Link from "next/link";

export default function Home() {
    return (
        <main className={styles.main}>
            <div>
                <Texto text="Futbolitos" variant="title"/>
            </div>
            <Card></Card>
            <div>
                <Link href = "./guia"><Button text="Guia" variant="normal"/></Link>
                <Link href = "./Cartas"><Button text="Cartas" variant="normal"/></Link>
                <Link href = "./ranking"><Button text="Ranking" variant="normal"/></Link>                
            </div>
            <div>
                <Link href = "./EleccionModo"><Button text="JUGAR" variant="jugar"/></Link>
            </div>
        </main>
    )
}