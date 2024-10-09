"use client"



export default function Login() {
    const [usuarios, setUsuarios] = useState([])
    const [inputUserName, setInputUserName] = useState("")
    const [inputUserPassword, setInputUserPassword] = useState("")
    const [userNamePlaceholder, setUserNamePlaceholder] = useState("");
    const [userPasswordPlaceholder, setUserPasswordPlaceholder] = useState("");
    const [mensajeDeError, setMensajeDeError] = useState(false)

    const Ingresar = (event) => {
        if (event.key === 'Enter') { ExisteUsuario() }
    };

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

    useEffect(() => {
        PedidoUsuarios();
    }, []);

    return (
        <div className={styles.divLogin} >
            <div className={styles.containerDatos}>
                <div> {/* COLUMNA CON INFORMACION */}

                    <h1 className={styles.h1}>Futbolitos</h1> {/* HACERLO COMPONENTE */}
                    <h2 className={styles.h2}>Login</h2>
                    <p className={styles.h1}>Si no tienes cuenta, <span className={styles.span} onClick={registrarse}>Registrate</span></p>
                    {mensajeDeError && (
                        <p className={styles.error}>No se encuentra el Usuario o la Contraseña</p>
                    )} {/* HACERLO COMPONENTE */}

                </div>
                <div className={styles.divInput}>{/* GRUPOS DE INPUTS PARA EL INGRESO */}

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="username">Nombre de usuario</label>
                        <input placeholder={userNamePlaceholder} id="username" className={styles.input} value={inputUserName} onChange={e => setInputUserName(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Contraseña</label> {/* HACERLO COMPONENTE */}
                        <input placeholder={userPasswordPlaceholder} id="password" className={styles.input} type="password" value={inputUserPassword} onChange={e => setInputUserPassword(e.target.value)} onKeyDown={Ingresar} /> {/* HACERLO COMPONENTE */}
                    </div>
                    <button className={styles.button} onClick={existeUser} >Ingresar</button> {/* HACERLO COMPONENTE */}

                </div>
            </div>
        </div>
    )
}
