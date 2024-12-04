"use client"

export default function docente({inicio, fin, aula}){
    return(
        <div>
        <p>{inicio} : {fin}</p>, 
        <p>{aula}</p>
        </div>
    )
}       