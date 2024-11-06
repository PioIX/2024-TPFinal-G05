"use client"
import Card from "@/Estructuras/Card";
import Button from "../../Components/Button";
import Texto from "../../Components/Texto";
import styles from "./page.module.css"
import Link from "next/link";
import { useState, useEffect } from "react";
import Paquete from "@/Estructuras/Paquete";
import { useRouter } from "next/navigation";

export default function Home() {
    const [muestroPaquete, setMuestroPaquete] = useState(true);
    const [cargando, setCargando] = useState(true); // Estado de carga
    const [primerPaquete, setPrimerPaquete] = useState(true);
    const [segundoPaquete, setSegundoPaquete] = useState(false);
    const router = useRouter();

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
        return respuesta;
    }

    useEffect(() => {
        const verificarCartas = async () => {
            const cartasGuardadas = await PlayersDelUsuario();
            // Si el usuario ya tiene 5 cartas, ocultamos el paquete
            if (cartasGuardadas.length >= 10) {
                setMuestroPaquete(false);
            }
            setCargando(false); // Cambiar el estado a false una vez que la carga finaliza
        };

        verificarCartas();
    }, []);

    const abrirPaquete = () => {
        if (primerPaquete) {
            setPrimerPaquete(false); // Oculta el primer paquete
            setSegundoPaquete(true); // Muestra el segundo paquete
        } else {
            setMuestroPaquete(false); // Oculta ambos paquetes
            setTimeout(() => {
                router.push('/home'); // Redirige a home después de abrir el segundo paquete
            }, 500); // Ajusta el tiempo según la duración de tu animación
        }
    };

    if (cargando) {
        return <div className={styles.divloader}><div className={styles.loader}></div></div>; // O algún otro componente de carga
    }

    return (
        <section className={styles.main}>
            {muestroPaquete ? (
                <>
                    {primerPaquete && (
                        <Paquete onClickButton={abrirPaquete} />
                    )}
                    {segundoPaquete && (
                        <Paquete onClickButton={abrirPaquete} />
                    )}
                </>
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
