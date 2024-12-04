"use client"

export default function docente({nombre, apellido, materia}){
    return(
        <div>
        <p>{nombre}</p>,
        <p>{apellido}</p>,
        <p>{materia}</p>
        </div>
    )
}           