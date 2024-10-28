"use client"
import Card from "@/Estructuras/Card";
import Button from "../../Components/Button";
import Texto from "../../Components/Texto";
import styles from "./page.module.css"
import Link from "next/link";
import NavTop from "@/Estructuras/NavTop";
import { useState } from "react";
import Paquete from "@/Estructuras/Paquete";
import { useEffect} from "react";



export default function Home() {
    const [muestroPaquete, setMuestroPaquete] = useState(true);
    const [cargando, setCargando] = useState(true); // Estado de carga
    
    async function PlayersDelUsuario() {
        const userID = localStorage.getItem("userID");
        const response = await fetch(`http://localhost:4000/PlayerXUserDetalles?userID=${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respuesta = await response.json();
        console.log(respuesta);
        return respuesta
    }


    useEffect(() => {
        const verificarCartas = async () => {
            const cartasGuardadas = await PlayersDelUsuario();
            // Si el usuario ya tiene 5 cartas, ocultamos el paquete
            if (cartasGuardadas.length >= 5) {
                setMuestroPaquete(false);
            }
            setCargando(false); // Cambiar el estado a false una vez que la carga finaliza
        };

        verificarCartas();
    }, []);

    function cambio() {
        setMuestroPaquete(false);
    }

    if (cargando) {
        return <div>Cargando...</div>; // O algún otro componente de carga
    }

    return (
        <section className={styles.main}>
            {muestroPaquete ? (
                <Paquete onClickButton={cambio} />
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
