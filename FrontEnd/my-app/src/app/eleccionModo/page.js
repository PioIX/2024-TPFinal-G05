"use client"
import P from "../../Components/Texto";
import styles from "./page.module.css"
import Image from "next/image";
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
            <div>
                <P text="Futbolitos" variant="title"/>
            </div>
            <div>
                <P text="Elije un modo de juego:" variant="h2"/>
            </div>
            <div className={styles.img}>
                <Image className={styles.imgDraft} onClick={futbolitosDraft}
                    src="/images/futbolitosDraft.png"
                    width={400}
                    height={400}
                    alt="futbolitosDraft"
                />
                <Image className={styles.imgBattle} onClick={futbolitosBattle}
                    src="/images/futbolitosBattle.png"
                    width={400}
                    height={400}
                    alt="futbolitosBattle"
                />
            </div>
        </main>
    )
}