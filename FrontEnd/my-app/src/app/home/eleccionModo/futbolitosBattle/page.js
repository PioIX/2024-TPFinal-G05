"use client"
import styles from "./page.module.css";
import { useSocket } from "@/app/hooks/useSocket";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Socket } from "socket.io-client";
import Esperando from "./BattleComponents/Esperando";
import NuevaSala from "./BattleComponents/NuevaSala";
import { useRouter } from "next/navigation";

export default function futbolitosBattle() {
    const router = useRouter();
    const { socket, isConnected } = useSocket();

    const [cambio, setCambio] = useState(true);
    const [conjuntoSalas, setConjuntoSalas] = useState([])
    const [codigoSala, setCodigoSala] = useState("")
    const [codigoActual, setCodigoActual] = useState("")
    const toggleMode = () => setCambio(!cambio);

    let sesionActual = {
        chatCode: 0,
        currentUser: 0,
    }

    useEffect(() => {
        if (!socket || !isConnected) return;
        traigoSalasCreadas();
        console.log("conectado");
    
        socket.on('startGame', () => {
            console.log("se conectaron los dos."); 
            router.push('/home/eleccionModo/futbolitosBattle/EleccionCartas');
        });
    
        return () => {
            socket.off('startGame');
        };
    
    }, [socket, isConnected, codigoSala]);

    function UnirSala(codigo) {
        if (isConnected) {
            setCodigoActual(codigo)
            socket.emit('joinRoom', { room: codigo });
        }
        // socket.emit('joinRoom', {room: codigoSala, unirme: true, id: UsuarioId});
    }

    async function traigoSalasCreadas() {
        const response = await fetch('http://localhost:4000/Salas', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        const users = result.map(users => ({
            Codigo: users.Codigo
        }));
        console.log(conjuntoSalas)
        setConjuntoSalas(users);
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
        } while (conjuntoSalas.some(sala => sala.Codigo === nuevoCodigo));
        
        return nuevoCodigo;
    }

    async function CrearSala() {
        if (conjuntoSalas.some(sala => sala.Codigo === codigoSala)) {
            UnirSala(codigoSala)
            console.log("Te uniste a una sala ya creada: ", codigoSala);
            toggleMode()
        } else {
            var nuevaSala = generarCodigo()
            console.log(nuevaSala)
            UnirSala(nuevaSala)
            console.log("Te uniste a la sala ", nuevaSala)
            console.log("Esperando al otro")
            const data = {
                Codigo: nuevaSala
            }
            const response = await fetch('http://localhost:4000/NuevaSala', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setConjuntoSalas((prevSalas) => [...prevSalas, { Codigo: nuevaSala }]); // EN DUDA
            toggleMode()
        }
    }

    return (
        <section className={styles.main}>
            {cambio ? (
            <NuevaSala
                onChange={(e) => setCodigoSala(e.target.value)}
                codigoSala={codigoSala}
                onClick={CrearSala}
            ></NuevaSala>
            ) : (
                <Esperando codigoDeLaSala = {codigoActual}></Esperando>
            )}
        </section>
    )
}