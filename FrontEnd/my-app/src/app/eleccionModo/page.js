"use client"
import Link from "next/link";
import P from "../../Components/Texto";
import styles from "./page.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function eleccionModo() {
    return (
        <main className={styles.main}>
            <div>
                <P text="Futbolitos" variant="title" />
            </div>
            <div>
                <P text="Elije un modo de juego:" variant="h2" />
            </div>
            <div className={styles.img}>
                <Link href="./FutbolitosDraft">
                    <Image className={styles.imgDraft} 
                        src="/images/futbolitosDraft.png"
                        width={400}
                        height={400}
                        alt="futbolitosDraft"
                    />
                </Link>
                <Link href="./FutbolitosBattle">
                    <Image className={styles.imgBattle} 
                        src="/images/futbolitosBattle.png"
                        width={400}
                        height={400}
                        alt="futbolitosBattle"
                    />
                </Link>

            </div>
        </main>
    )
}