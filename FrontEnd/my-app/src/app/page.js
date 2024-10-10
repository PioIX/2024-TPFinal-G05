"use client";
import { useRouter } from "next/navigation";
import Button from "../Components/Button";
import Texto from "../Components/Texto";
import styles from "./page.module.css"
import Login from "@/Estructuras/Login";
import Register from "@/Estructuras/Register";
import { useState } from "react/cjs/react.production.min";

export default function Home() {
    const [Ingreso, setIngreso] = useState(true)
    const [Registro, setRegistro] = useState(false)

    function hola() {
        if (Ingreso === true) {
            setRegistro(!Registro)
            setIngreso(!Ingreso)
        } else if (Ingreso === false) {
            setRegistro(!Registro)
            setIngreso(!Ingreso)
        }
    }
    return (
        <main >
            <Login style={{ display: Ingreso ? 'flex' : 'none' }}></Login>
            <Register style={{ display: Registro ? 'flex' : 'none' }}></Register>
        </main>
    )
}