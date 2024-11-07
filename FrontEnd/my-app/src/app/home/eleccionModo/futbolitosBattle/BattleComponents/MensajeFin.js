"use client"

import Texto from "@/Components/Texto";
import styles from "./MensajeFin.module.css"
import Paquete from "@/Estructuras/Paquete";
import { useEffect, useState } from "react";
import Button from "@/Components/Button";
import { useRouter } from "next/navigation";

export default function MensajeFin({ resultado }) {
    const router = useRouter();
    const [mensajeGanaste, setMensajeGanaste] = useState(false);
    const [mensajePerdiste, setMensajePerdiste] = useState(false);
    const [mensajeEmpataste, setMensajeEmpataste] = useState(false);

    const [mostrarSobre, setMostrarSobre] = useState(false)
    const [mostrarSobreDos, setMostrarSobreDos] = useState(false)
    const [mostrarSobreTres, setMostrarSobreTres] = useState(false)

    useEffect(() => {
        if (resultado === "Ganaste") {
            setMensajeGanaste(true)
        } else if (resultado === "Perdiste") {
            setMensajePerdiste(true)
        } else if (resultado === "Empataste") {
            setMensajeEmpataste(true)
        }
    })

    function abroElOtroSobre(){ 
        setMensajeEmpataste(false)
        setMostrarSobreDos(false)
        setMostrarSobreTres(true)
    }

    function continuar () {
        router.push('/home');
    }

    return (
        <div className={styles.container}>
            <div className={styles.cuadro}>
                {mensajeGanaste && (
                    <>
                        <div>
                            <Texto variant="NavTitle" text={resultado}></Texto>
                            <Texto variant="p" text="Bien ahi, te ganaste dos sobres para que completes la coleccion"></Texto>
                        </div>
                        <div>
                            <Button onClick={() => setMostrarSobreDos(true)} text = "Reclamar"></Button>
                        </div>
                    </>
                )}
                {mensajePerdiste && (
                    <>
                        <div className = {styles.dentroContainer} >
                            <div>
                                <Texto variant="NavTitle" text={resultado}></Texto>
                                <Texto variant="p" text="Mala suerte esta vez, tenes mas chances de sumar jugadores la proxima, te regalamos un sobre de consuelo malo"></Texto>
                            </div>
                            <div>
                                <img></img>
                            </div>
                        </div>

                        <div>
                            <Button onClick={() => setMostrarSobre(true)} text = "Reclamar"></Button>
                        </div>
                    </>
                )}
                {mensajeEmpataste && (
                    <>
                        <div>
                            <div>
                                <Texto variant="NavTitle" text={resultado}></Texto>
                                <Texto variant="p" text="Que tibio, empateste, no te preocupes, te regalamos un sobre por lastima"></Texto>
                            </div>
                            <div>
                                <img></img>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => setMostrarSobre(true)} text = "Reclamar"></Button>
                        </div>
                    </>
                )}
                {mostrarSobre && (
                    <Paquete onClickButton={continuar} />
                )}
                {mostrarSobreDos && (
                    <>
                        <Paquete onClickButton={abroElOtroSobre} />
                        {mostrarSobreTres && (
                            <Paquete onClickButton={continuar} />
                        )}
                    </>
                )}
            </div>
        </div >
    )
}