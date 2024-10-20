"use client"
import Link from "next/link";
import P from "../../../Components/Texto";
import styles from "./page.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavTop from "@/Estructuras/NavTop";
export default function eleccionModo() {
    return (
        <section className={styles.main}>
            <NavTop></NavTop>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className={styles.img}>
                <Link href="./eleccionModo/futbolitosDraft">
                    <Image className={styles.imgDraft} 
                        src="/images/futbolitosDraft.png"
                        width={400}
                        height={400}
                        alt="futbolitosDraft"
                    />
                </Link>
                <Link href="./eleccionModo/futbolitosBattle">
                    <Image className={styles.imgBattle} 
                        src="/images/futbolitosBattle.png"
                        width={400}
                        height={400}
                        alt="futbolitosBattle"
                    />
                </Link>
            </div>
        </section>
    )
}