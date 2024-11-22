"use client";

import Texto from "@/Components/Texto";
import styles from "./MensajeFin.module.css";
import Paquete from "@/Estructuras/Paquete";
import { useEffect, useState } from "react";
import Button from "@/Components/Button";
import { useRouter } from "next/navigation";

export default function MensajeFin({ resultado }) {
    const router = useRouter();
    const [mensajeGanaste, setMensajeGanaste] = useState(false);
    const [mensajePerdiste, setMensajePerdiste] = useState(false);
    const [mensajeEmpataste, setMensajeEmpataste] = useState(false);

    const [mostrarSobre, setMostrarSobre] = useState(false);
    const [mostrarSobreDos, setMostrarSobreDos] = useState(false);
    const [mostrarSobreTres, setMostrarSobreTres] = useState(false);

    useEffect(() => {
        if (resultado === "Ganaste") {
            setMensajeGanaste(true);
        } else if (resultado === "Perdiste") {
            setMensajePerdiste(true);
        } else if (resultado === "Empataste") {
            setMensajeEmpataste(true);
        }
    });

    function abroElOtroSobre() {
        setMensajeEmpataste(false);
        setMostrarSobreDos(false);
        setMostrarSobreTres(true);
    }

    function continuar() {
        router.push('/home');
    }

    return (
        <div className={styles.container}>
            <div className={styles.cuadro}>
                {mensajeGanaste && (
                    <div className={styles.message}>
                        <div>
                            <Texto variant="NavTitle" text={resultado} className={styles.title}></Texto>
                            <Texto variant="p" text="¡Bien ahí! Te ganaste dos sobres para completar la colección" className={styles.text}></Texto>
                        </div>
                        <img src="/images/CopaMundo.png" className={styles.corpiño}></img>
                        <Button
                            onClick={() => setMostrarSobreDos(true)}
                            text="Reclamar"
                            className={styles.reclamarButton}
                        />
                    </div>
                )}
                {mensajePerdiste && (
                    <div className={styles.message}>
                        <div>
                            <Texto variant="NavTitle" text={resultado} className={styles.title}></Texto>
                            <Texto variant="p" text="Mala suerte esta vez. ¡Te regalamos un sobre de consuelo!" className={styles.text}></Texto>
                        </div>
                        <img src="/images/RonaldoLlorando.png" className={styles.corpiño}></img>
                        <Button
                            onClick={() => setMostrarSobre(true)}
                            text="Reclamar"
                            className={styles.reclamarButton}
                        />
                    </div>
                )}
                {mensajeEmpataste && (
                    <div className={styles.message}>
                        <div>
                            <Texto variant="NavTitle" text={resultado} className={styles.title}></Texto>
                            <Texto variant="p" text="Empataste, pero no te preocupes, te regalamos un sobre por lástima." className={styles.text}></Texto>
                        </div>
                        <img src="/images/MessientoEnojado.png" className={styles.corpiño}></img>
                        <Button
                            onClick={() => setMostrarSobre(true)}
                            text="Reclamar"
                            className={styles.reclamarButton}
                        />
                    </div>
                )}
                {mostrarSobre && <Paquete onClickButton={continuar} onClickButtonDos={continuar} />}
                {mostrarSobreDos && (
                    <>
                        <Paquete onClickButton={abroElOtroSobre} onClickButtonDos={continuar} />
                        {mostrarSobreTres && <Paquete onClickButton={continuar} onClickButtonDos={continuar} />}
                    </>
                )}
            </div>
        </div>
    );
}
