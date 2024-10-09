"use client"
import styles from "./cartas.module.css";
import { useRouter } from "next/navigation";
export default function Cartas() {
    const router = useRouter();
    function futbolitosBattle(){
        router.push("/futbolitosBattle")
    }
    function futbolitosDraft(){
        router.push("/futbolitosDraft")
    }
    return (
        <main className={styles.main}>
        </main>
    )
}