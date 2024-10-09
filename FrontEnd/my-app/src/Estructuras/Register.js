const [registro, setRegistro] = useState(false);



export default function Register() {
    const [inputNewName, setNewName] = useState("")
    const [inputNewApellido, setNewApellido] = useState("")
    const [inputNewUserName, setNewUserName] = useState("")
    const [inputNewpassword, setNewpassword] = useState("")

    const [userNamePlaceholderDos, setUserNamePlaceholderDos] = useState("");
    const [userPasswordPlaceholderDos, setUserPasswordPlaceholderDos] = useState("");
    const [userNombrePlaceholder, setUserNombrePlaceholder] = useState("");
    const [userApellidoPlaceholder, setUserApellidoPlaceholder] = useState("");


    async function RegistrarUsuario() {
        if (inputNewName === "") {setUserNombrePlaceholder("Campo Obligatorio");}
        if (inputNewApellido === "") {setUserApellidoPlaceholder("Campo Obligatorio");}
        if (inputNewUserName === "") {setUserNamePlaceholderDos("Campo Obligatorio");}
        if (inputNewpassword === "") {setUserPasswordPlaceholderDos("Campo Obligatorio");}

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

    const Registrarse = (event) => {
        if (event.key === 'Enter') {RegistrarUsuario()}
    };

    return (
        <div className={styles.divRegister}>
            <div>
                <Icon onClick={registrarse} srcImg="/Iconos/IconoVolver.svg" variant="section"></Icon>
            </div>
            <div className={styles.containerDatos}>
                <div>
                    <h2 className={styles.h2}>Register</h2>
                </div>
                <div className={styles.divInput}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="Nombre">Nombre</label>
                        <input placeholder={userNombrePlaceholder} id="Nombre" className={styles.input} value={inputNewName} onChange={e => setNewName(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="Apellido">Apellido</label>
                        <input placeholder={userApellidoPlaceholder} id="Apellido" className={styles.input} value={inputNewApellido} onChange={e => setNewApellido(e.target.value)} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="UserNameDos">Nombre de usuario</label>
                        <input placeholder={userNamePlaceholderDos} id="UserNameDos" className={styles.input} value={inputNewUserName} onChange={e => setNewUserName(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="Pasword">Contraseña</label>
                        <input placeholder={userPasswordPlaceholderDos} id="Pasword" className={styles.input} vvalue={inputNewpassword} onChange={e => setNewpassword(e.target.value)} onKeyDown={Registrarse} />
                    </div>

                    <button className={styles.button} onClick={RegistrarUsuario}>registrarse</button>
                </div>
            </div>
        </div>
    )
}