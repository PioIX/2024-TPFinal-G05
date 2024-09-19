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
    function cartas() {
        router.push('/cartas');
    }
    function ranking() {
        router.push('/ranking');
    }
    function guia() {
        router.push('/guia');
    }
    return (
        <main className={styles.main}>
            <div>
                <P text="Futbolitos" variant="title"/>
            </div>
            <div>
                <Button text="Guia" variant="normal" onClick={guia}/>
                <Button text="Cartas" variant="normal" onClick={cartas}/>
                <Button text="Ranking" variant="normal" onClick={ranking}/>
            </div>
            <div>
                <Button text="JUGAR" variant="jugar" onClick={eleccionModo}/>
            </div>
        </main>
    )
}