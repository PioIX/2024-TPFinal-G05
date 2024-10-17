"use client"
import styles from "./page.module.css"

export default function Ranking() {
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