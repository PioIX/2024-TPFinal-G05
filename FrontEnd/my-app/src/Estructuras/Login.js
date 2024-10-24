"use client"

import { useEffect, useState } from "react";
import styles from "./Login.module.css"
import Texto from "@/Components/Texto";



export default function Login({inputUserPassword, inputUserName, mensajeDeError, onChangeInputUserName, onChangeInputPassword, userNamePlaceholder, userPasswordPlaceholder, onClickCambio, OnKeyDownIngreso, OnClickIngreso}) {    
    return (
        <div className={styles.divLogin} >
            <div className={styles.containerDatos}>
                <div> {/* COLUMNA CON INFORMACION */}

                    <h1 className={styles.h1}>Futbolitos</h1> {/* HACERLO COMPONENTE */}
                    <h2 className={styles.h2}>Login</h2>
                    {mensajeDeError && (
                        <Texto variant="error">No se encuentra el Usuario o la Contraseña</Texto>
                    )} {/* HACERLO COMPONENTE */}

                </div>
                <div className={styles.divInput}>{/* GRUPOS DE INPUTS PARA EL INGRESO */}

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="username">Nombre de usuario</label>
                        <input placeholder={userNamePlaceholder} id="username" className={styles.input} value={inputUserName} onChange={onChangeInputUserName} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Contraseña</label> {/* HACERLO COMPONENTE */}
                        <input placeholder={userPasswordPlaceholder} id="password" className={styles.input} type="password" value={inputUserPassword} onChange={onChangeInputPassword} onKeyDown={OnKeyDownIngreso} /> {/* HACERLO COMPONENTE */}
                    </div>

                    <p className={styles.p}>Si no tienes cuenta, <span className={styles.span} onClick={onClickCambio}>REGISTRATE</span></p>
                    <button className={styles.button} onClick={OnClickIngreso} >Ingresar</button> {/* HACERLO COMPONENTE */}

                </div>
            </div>
        </div>
    )
}
