"use client"
import CrearSala from "./BattleComponents/CrearSala";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function futbolitosBattle() {
    return (
        <section className={styles.main}>
            <CrearSala></CrearSala>
        </section>
    )
}