"use client"
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Socket } from "socket.io-client";
import Esperando from "./BattleComponents/Esperando";
import NuevaSala from "./BattleComponents/NuevaSala";

export default function futbolitosBattle() {
    const { socket, isConnected } = useSocket();

    const [cambio, setCambio] = useState(true);
    const [conjuntoSalas, setConjuntoSalas] = useState([])
    const [codigoSala, setCodigoSala] = useState("")
    const toggleMode = () => setCambio(!cambio);

    let sesionActual = {
        chatCode: 0,
        currentUser: 0,
    }

    useEffect(() => {
        if (!socket) return;
        if(isConnected){
            console.log("conectado")
        }
    }, [socket, isConnected]);

    function UnirSala(codigo) {
        if (isConnected) {
            socket.emit('joinRoom', { room: codigo });
        }
        // socket.emit('joinRoom', {room: codigoSala, unirme: true, id: UsuarioId});
    }

    function generarCodigo() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let nuevoCodigo;
        do {
            nuevoCodigo = '';
            for (let i = 0; i < 4; i++) {
                const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                nuevoCodigo += caracteres[indiceAleatorio];
            }
        } while (conjuntoSalas.includes(nuevoCodigo));
        return nuevoCodigo;
    }

console.log(conjuntoSalas)
    function CrearSala() {
        if (conjuntoSalas.includes(codigoSala)) {
            UnirSala(codigoSala)
            console.log("Te uniste a una sala ya creada: ", codigoSala);
            toggleMode()
        } else {
            var nuevaSala = generarCodigo()
            UnirSala(nuevaSala)
            console.log("Te uniste a la sala ", nuevaSala)
            console.log("Esperando al otro")
            setConjuntoSalas((prevSalas) => [...prevSalas, nuevaSala]);
            toggleMode()
        }
    }

    return (
        <section className={styles.main}>
            {/* {cambio ? ( */}
                <NuevaSala
                    onChange = {(e) => setCodigoSala(e.target.value)}
                    codigoSala = {codigoSala}
                    onClick = {CrearSala}
                ></NuevaSala>
            {/* ) : (
                <Esperando></Esperando>
            )} */}
        </section>
    )
}