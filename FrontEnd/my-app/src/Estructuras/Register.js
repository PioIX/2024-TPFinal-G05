import { useState } from "react";
import styles from "./Register.module.css";
import Icon from "@/Components/Icon";


export default function Register({onClickCambio, OnClickRegistro, OnKeyDownRegistro, inputNewName, inputNewApellido, inputNewUserName, inputNewpassword, userNamePlaceholderDos, userPasswordPlaceholderDos, userNombrePlaceholder, userApellidoPlaceholder, onChangeUno, onChangeDos, onChangeTres, onChangeCuatro}) {
        
    return (
        <div className={styles.divRegister}>
            <div>
                <Icon onClick={onClickCambio} srcImg="/Iconos/IconoVolver.svg" variant="section"></Icon>
            </div>
            <div className={styles.containerDatos}>
                <div>
                    <h2 className={styles.h2}>Register</h2>
                </div>
                <div className={styles.divInput}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="Nombre">Nombre</label>
                        <input placeholder={userNombrePlaceholder} id="Nombre" className={styles.input} value={inputNewName} onChange={onChangeUno} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="Apellido">Apellido</label>
                        <input placeholder={userApellidoPlaceholder} id="Apellido" className={styles.input} value={inputNewApellido} onChange={onChangeDos} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="UserNameDos">Nombre de usuario</label>
                        <input placeholder={userNamePlaceholderDos} id="UserNameDos" className={styles.input} value={inputNewUserName} onChange={onChangeTres} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="Pasword">Contraseña</label>
                        <input placeholder={userPasswordPlaceholderDos} id="Pasword" className={styles.input} vvalue={inputNewpassword} onChange={onChangeCuatro} onKeyDown={OnKeyDownRegistro} />
                    </div>

                    <button className={styles.button} onClick={OnClickRegistro}>registrarse</button>
                </div>
            </div>
        </div>
    )
}