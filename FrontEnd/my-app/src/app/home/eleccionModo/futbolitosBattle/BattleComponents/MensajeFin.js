"use client"

import Texto from "@/Components/Texto";
import styles from "./MensajeFin.module.css"
import Paquete from "@/Estructuras/Paquete";

export default function MensajeFin({ resultado }) {
    const [mensajeGanaste, setMensajeGanaste] = useState(false);
    const [mensajePerdiste, setMensajePerdiste] = useState(false);
    const [mensajeEmpataste, setMensajeEmpataste] = useState(false);

    useEffect(() => {
        if (resultado === "Ganaste") {
            setMensajeGanaste(true)
        } else if (resultado === "Perdiste") {
            setMensajePerdiste(true)
        } else if (resultado === "Empataste") {
            setMensajeEmpataste(true)
        }
    })

    return (
        <div>
            {mensajeGanaste && (
                <>
                    <h1 className={styles.title}>{resultado}</h1>
                    <Texto text="Bien ahi, te ganaste dos sobres para que completes la coleccion"></Texto>
                </>
            )}
            {mensajePerdiste && (
                <>
                    <h1 className={styles.title}>{resultado}</h1>
                    <Texto text="Mala suerte esta vez, tenes mas chances de sumar jugadores la proxima, te regalamos un sobre de consuelo malo"></Texto>
                </>
            )}
            {mensajeEmpataste && (
                <>
                    <h1 className={styles.title}>{resultado}</h1>
                    <Texto text="Que tibio, empateste, no te preocupes, te regalamos un sobre por lastima"></Texto>
                </>
            )}
            {mostrarSobre && (
                <Paquete onClickButton={continuar} />
            )}
        </div>
    )
}