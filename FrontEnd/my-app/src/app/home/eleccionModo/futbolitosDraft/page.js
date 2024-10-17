"use client"
import styles from "./futbolitosDraft.module.css";
import { useRouter } from "next/navigation";
export default function futbolitosDraft() {
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