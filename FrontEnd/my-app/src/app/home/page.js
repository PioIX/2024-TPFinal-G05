"use client";

import Card from "@/Estructuras/Card";
import Button from "../../Components/Button";
import Texto from "../../Components/Texto";
import styles from "./page.module.css"
import Link from "next/link";
import NavTop from "@/Estructuras/NavTop";
import { useState } from "react";
import Paquete from "@/Estructuras/Paquete";

export default function Home() {
    const [muestroPaquete, setMuestroPaquete] = useState(false);

    return (
        <section className={styles.main}>
            {muestroPaquete ? (
                <Paquete></Paquete>
            ) : (
                <>
                    <div>
                        <Texto text="Futbolitos" variant="title" />
                    </div>
                    
                    <div>
                        <Link href="/home/guia">
                            <Button text="Guia" variant="normal" />
                        </Link>
                        <Link href="/home/cartas">
                            <Button text="Cartas" variant="normal" />
                        </Link>
                        <Link href="/home/ranking">
                            <Button text="Ranking" variant="normal" />
                        </Link>
                    </div>
                    <div>
                        <Link href="/home/eleccionModo">
                            <Button text="JUGAR" variant="jugar" />
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}