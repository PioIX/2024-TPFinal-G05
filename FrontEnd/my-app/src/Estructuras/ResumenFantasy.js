"use client"
import React from 'react';
import ProgressBar from './ProgressBar';  // Asegúrate de importar correctamente
import styles from './ResumenFantasy.module.css';

export default function ResumenFantasy() {
    return (
        <div >
            <div >
                {/* Título si es necesario */}
            </div>
            <div>
                <div>
                    {/* Contenedor para los diferentes roles */}
                    <div>
                        <p>Delanteros</p>
                            <ProgressBar value={75} size={150} />
                       
                    </div>
                    <div>
                        <p>CentroCampistas</p>
                        {/* <div>
                            <ProgressBar value={75} size={150} />
                        </div> */}
                    </div>
                </div>
                <div>
                    <p>Defensores</p>
                    {/* <div>
                        <ProgressBar value={75} size={150} />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
