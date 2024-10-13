"use client";
import { useRouter } from "next/navigation";
import Button from "../Components/Button";
import Texto from "../Components/Texto";
import styles from "./page.module.css"
import Login from "../Estructuras/Login";
import Register from "@/Estructuras/Register";
import { useEffect, useState } from "react";

export default function Home() {
    const [Ingreso, setIngreso] = useState(true);
    const [usuarios, setUsuarios] = useState([])
    // INGRESO //
    const [inputUserName, setInputUserName] = useState("")
    const [inputUserPassword, setInputUserPassword] = useState("")

    const [userNamePlaceholder, setUserNamePlaceholder] = useState("");
    const [userPasswordPlaceholder, setUserPasswordPlaceholder] = useState("");
    const [mensajeDeError, setMensajeDeError] = useState(false)
    // REGISTRO //
    const [inputNewName, setNewName] = useState("")
    const [inputNewApellido, setNewApellido] = useState("")
    const [inputNewUserName, setNewUserName] = useState("")
    const [inputNewpassword, setNewpassword] = useState("")
    const [userNamePlaceholderDos, setUserNamePlaceholderDos] = useState("");
    const [userPasswordPlaceholderDos, setUserPasswordPlaceholderDos] = useState("");
    const [userNombrePlaceholder, setUserNombrePlaceholder] = useState("");
    const [userApellidoPlaceholder, setUserApellidoPlaceholder] = useState("");

    const Ingresar = (event) => {
        if (event.key === 'Enter') { ExisteUsuario() }
    };
    const Registrarse = (event) => {
        if (event.key === 'Enter') { RegistrarUsuario() }
    };

    const toggleMode = () => setIngreso(!Ingreso);

    async function PedidoUsuarios() {
        const response = await fetch('http://localhost:4000/Usuario', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await response.json()
        const users = result.map(users => ({
            UserId: users.UserId,
            UserName: users.UserName,
            UserPassword: users.UserPassword,
            Nombre: users.Nombre,
            Apellido: users.Apellido,
        }));
        setUsuarios(users);
    }

    async function ExisteUsuario() {
        if (inputUserName === "") { setUserNamePlaceholder("Campo Obligatorio"); }
        if (inputUserPassword === "") { setUserPasswordPlaceholder("Campo Obligatorio"); }
        if (inputUserName !== "" && inputUserPassword !== "") {
            const data = {
                UserName: inputUserName,
                UserPassword: inputUserPassword,
            }
            console.log("Usuario es ", data)
            const response = await fetch('http://localhost:4000/ExisteUsuario', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            // Los placeholder
            setUserNamePlaceholder("");
            setUserPasswordPlaceholder("");
            // Los inputs
            setInputUserName("")
            setInputUserPassword("")
            console.log("El Back devuelve ", result);
            if (result.length > 0) {
                console.log("Inicio secion el usuario ", result)
                // window.location.href = './home';
            } else {
                console.log(result);
                setMensajeDeError(!mensajeDeError)
            }
        }

    }

    async function RegistrarUsuario() {
        if (inputNewName === "") { setUserNombrePlaceholder("Campo Obligatorio"); }
        if (inputNewApellido === "") { setUserApellidoPlaceholder("Campo Obligatorio"); }
        if (inputNewUserName === "") { setUserNamePlaceholderDos("Campo Obligatorio"); }
        if (inputNewpassword === "") { setUserPasswordPlaceholderDos("Campo Obligatorio"); }

        if (inputNewpassword !== "" && inputNewUserName !== "" && inputNewName !== "" && inputNewApellido !== "") {
            const data = {
                UserName: inputNewUserName,
                UserPassword: inputNewpassword,
                Nombre: inputNewName,
                Apellido: inputNewApellido,
            }
            const response = await fetch('http://localhost:4000/NuevoUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setUserNamePlaceholderDos("");
            setUserPasswordPlaceholderDos("");
            setUserApellidoPlaceholder("")
            setUserNombrePlaceholder("")
        }
    }

    useEffect(() => {
        // PedidoUsuarios();
    }, []);

    return (
        <main >
            {Ingreso ? (
                <Login
                    inputUserPassword={inputUserPassword}
                    inputUserName={inputUserName}
                    mensajeDeError={mensajeDeError}
                    onClickCambio={toggleMode}
                    OnKeyDownIngreso={Ingresar}
                    OnClickIngeso={ExisteUsuario}
                    onChangeInputUserName={e => setInputUserName(e.target.value)}
                    onChangeInputPassword={e => setInputUserPassword(e.target.value)}
                    userNamePlaceholder={userNamePlaceholder}
                    userPasswordPlaceholder={userPasswordPlaceholder}
                ></Login>
            ) : (
                <Register
                    onClickCambio={toggleMode}
                    OnClickRegistro={RegistrarUsuario}
                    OnKeyDownRegistro={Registrarse}
                    inputNewName={inputNewName}
                    inputNewApellido={inputNewApellido}
                    inputNewUserName={inputNewUserName}
                    inputNewpassword={inputNewpassword}
                    userNamePlaceholderDos={userNamePlaceholderDos}
                    userPasswordPlaceholderDos={userPasswordPlaceholderDos}
                    userNombrePlaceholder={userNombrePlaceholder}
                    userApellidoPlaceholder={userApellidoPlaceholder}
                    onChangeUno={e => setNewName(e.target.value)}
                    onChangeDos={e => setNewApellido(e.target.value)}
                    onChangeTres={e => setNewUserName(e.target.value)}
                    onChangeCuatro={e => setNewpassword(e.target.value)}
                ></Register>
            )}

        </main>
    )
}