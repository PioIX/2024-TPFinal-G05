"use client"
import styles from "./FutbolitosBattle.module.css";
import { useRouter } from "next/navigation";
export default function eleccionModo() {
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