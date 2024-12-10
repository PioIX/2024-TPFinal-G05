"use client"

import Paja from "@/Components/Componente1"

const tareas = 
[{
		nombre: "Crear Base de Datos",
		responsable: "Marchesi",
		estado: "Pendiente"
	},
	{
		nombre:	"Crear Evaluaciones",
		responsable: "Rivas",
		estado: "Realizada"
	},
	{
		nombre: "Rendi Evaluacion",
		responsable: "Alumnos",
		estado: "En proceso"
	}
]


export default function prueba(){
    
    return(

    <>
        <div>
            {tareas.length > 0 && tareas.map((tar) => ({
                Nombre: tar.nombre,
                Responsable: tar.responsable,
                Estado: tar.estado}))}
            <Paja>{texto1= {Nombre}} {texto2= {Estado}} {texto3= {Estado}}</Paja>
            <Paja>{texto1= {Nombre}} {texto2= {Estado}} {texto3= {Estado}}</Paja>
            <Paja>{texto1= {Nombre}} {texto2= {Estado}} {texto3= {Estado}}</Paja>
        </div>


    
    
    </>)
}