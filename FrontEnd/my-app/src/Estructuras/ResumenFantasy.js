"use client"
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';  // Asegúrate de importar correctamente
import styles from './ResumenFantasy.module.css';
import Texto from '@/Components/Texto';
import CardFantasy from './CardFantasy';
import StarRating from './StarRating';
import Button from '@/Components/Button';
import Paquete from './Paquete';
import { Router, useRouter } from 'next/navigation';

export default function ResumenFantasy({ Delantero, MedioCentro, Defensa, mediaEquipo, valueDefensa, valueAtaque, valueControl }) {
    
    const router = useRouter();
    const [jugadorDelantero, setJugadorDelantero] = useState(Delantero)
    const [jugadorMedioCentro, setJugadorMedioCentro] = useState(MedioCentro)
    const [jugadorDefensa, setJugadorDefensa] = useState(Defensa)
    const [mostrarSobre, setMostrarSobre] = useState(false);

    function continuar() {
        router.push('/home');
    }
    return (
        <div className={styles.container}>
            {mostrarSobre && <Paquete onClickButton={continuar} onClickButtonDos={continuar} />}
            {!mostrarSobre && (
                <div className={styles.divGrande}>
                    <div>
                        <Texto variant="h22" text="RESUMEN FANTASY"></Texto>
                    </div>
                    <div className={styles.Horizontal}>
                        <div className={styles.contenedorDos}>
                            <div className={styles.mejoresJugadores}>
                                {jugadorDelantero && (
                                    <>

                                        <CardFantasy
                                            isSmall={true}
                                            posicion={jugadorDelantero.Posicion}
                                            nacionalidad={jugadorDelantero.Nacionalidad}
                                            imagenJugador={jugadorDelantero.Imagen}
                                            escudo={jugadorDelantero.Equipo}
                                            nombreJugador={jugadorDelantero.Apellido}
                                            ataque={jugadorDelantero.Ataque}
                                            control={jugadorDelantero.Control}
                                            defensa={jugadorDelantero.Defensa}
                                        ></CardFantasy>
                                    </>
                                )}
                                {jugadorMedioCentro && (
                                    <>

                                        <CardFantasy
                                            isSmall={true}
                                            posicion={jugadorMedioCentro.Posicion}
                                            nacionalidad={jugadorMedioCentro.Nacionalidad}
                                            imagenJugador={jugadorMedioCentro.Imagen}
                                            escudo={jugadorMedioCentro.Equipo}
                                            nombreJugador={jugadorMedioCentro.Apellido}
                                            ataque={jugadorMedioCentro.Ataque}
                                            control={jugadorMedioCentro.Control}
                                            defensa={jugadorMedioCentro.Defensa}
                                        ></CardFantasy>
                                    </>
                                )}
                                {jugadorDefensa && (
                                    <>

                                        <CardFantasy
                                            isSmall={true}
                                            posicion={jugadorDefensa.Posicion}
                                            nacionalidad={jugadorDefensa.Nacionalidad}
                                            imagenJugador={jugadorDefensa.Imagen}
                                            escudo={jugadorDefensa.Equipo}
                                            nombreJugador={jugadorDefensa.Apellido}
                                            ataque={jugadorDefensa.Ataque}
                                            control={jugadorDefensa.Control}
                                            defensa={jugadorDefensa.Defensa}
                                        ></CardFantasy>
                                    </>
                                )}
                            </div>
                            <div className={styles.Stadisticas}>
                                <div className={styles.graficos}>

                                    <ProgressBar value={valueAtaque} size={150} />
                                    <Texto variant="p2" text="Delanteros"></Texto>
                                </div>
                                <div className={styles.graficos}>
                                    <ProgressBar value={valueControl} size={150} />
                                    <Texto variant="p2" text="CentroCampistas"></Texto>
                                </div>
                                <div className={styles.graficos}>

                                    <ProgressBar value={valueDefensa} size={150} />
                                    <Texto variant="p2" text="Defensores"></Texto>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Recompensa}>
                            <div className={styles.Estrellas}>
                                <StarRating rating={mediaEquipo}></StarRating>
                            </div>
                            <div className={styles.Texto}>
                                <Texto variant="p" text="Felicidades te ganaste por tu Fantasy"></Texto>
                                <Button onClick={() => setMostrarSobre(true)} text="Reclamar" className={styles.reclamarButton} />
                                
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>

    );
}
