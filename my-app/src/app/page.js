"use client";
import { useRouter } from "next/navigation";
import Button from "../components/button";
import P from "../components/p";
import styles from "./inicio.module.css"

export default function Home() {
    const router = useRouter();
    function eleccionModo() {
        router.push('/eleccionModo');
    }
    return (
        <main className={styles.main}>
            <div>
                <P text="Futbolitos" variant="title"/>
            </div>
            <div>
                <Button text="Guia" variant="normal" />
                <Button text="Cartas" variant="normal" />
                <Button text="Ranking" variant="normal" />
            </div>
            <div>
                <Button text="JUGAR" variant="jugar" onClick={eleccionModo}/>
            </div>
        </main>
    )
}