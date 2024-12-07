// "use client"

// import { useState } from "react"




// export default function prueba(){
//     const[tarea, setTarea] = useState("")
//     const[tar, setTar] = useState([])
//     async function traigoTareas() {
//         const response = await fetch('http://localhost:3000/tareas', {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         const respuesta = await response.json()
//         setTarea(respuesta)
//         console.log("esta acaaaqaa", respuesta)
//         console.log(tarea)

//         const tare = respuesta.map(tareas=>({
//             tareaNombre: tareas.nombre,
//             tareaRespon: tareas.responsable,
//             tareaEstado: tareas.estado

//         }));
//         console.log(tare)
//         setTar(tare)
//         console.log(tar)

//     }


//     return ("A")
// };

// "use client"


// import { useSocket } from "@/app/hooks/useSocket";
// import { useEffect, useState } from "react"

// export default function DiciembrePage() {
//     const [productos, setProductos] = useState([]);
//     const [precio, setPrecio] = useState(0);
//     const [nombre, setNombre] = useState("");
//     const {socket, isConnected} = useSocket();

//     useEffect(() => {
//         obtenerProductos();
//     }, [])

//     useEffect(() => {
//         if (!socket)
//             return;

//         socket.on("avisoCreacion", (data) => {
//             console.log("ALGUIEN MAS CREO UN PRODUCTO");
//             productos.push({nombre: data.message.nombre, precio: data.message.precio});
//         })
//     }, [socket, isConnected])

//     async function obtenerProductos() {
//         let result = await fetch("http://localhost:4000/productos", {
//             method: "GET"
//         })
//         let resultado = await result.json();
//         console.log(resultado.productos);
//         setProductos(resultado.productos);
//         console.log(productos)
//     }

//     async function crearProductos() {
//         let isCreated = false;

//         //Validacion de producto ya existente
//         for (let i = 0; i < productos.length; i++) {
//             if (productos[i].nombre == nombre) {
//                 isCreated = true;
//                 return;
//             }
//         }

//         if (isCreated == false) {
//             let result = await fetch("http://localhost:4000/crearProducto", {
//                 method: "POST",
//                 body: {nombre: nombre, precio: precio}
//             })
//             productos.push({nombre: nombre, precio: precio});
//             socket.emit("productoCreado", {nombre: nombre, precio: precio});
//         }
//     }

//     return (
//         <>
//             {
//                 productos.map((producto) => {
//                     return (
//                         <p key={producto.nombre} nombre={producto.nombre} precio={producto.precio}></p>
//                     )
//                 })
//             }
//             <input type="text" onChange={(event) => setNombre(event.target.value)}></input>
//             <input type="text" onChange={(event) => setPrecio(event.target.value)}></input>
//             <button onClick={crearProductos} text="Crear Productos"></button>
//         </>
//     )
// }

"use client"

import Docente from "@/Components/Docente";
import { useEffect, useState } from "react"
import { useSocket } from "@/app/hooks/useSocket";

export default function () {
    const { socket, isConnected } = useSocket();
    const [tareas, setTareas] = useState([])
    const [nombre, setNombre]= useState("")
    const [responsable, setResponsable]= useState("")
    const [estado, setEstado] = useState("")
    
    useEffect(() => {
        obtenerTareas();
    }, [])  



    async function obtenerTareas() {
        let response = await fetch("http://localhost:4000/tareas", {
            method: "GET"
        })
        let resultado = await response.json();
        console.log(resultado.tareas);
        setTareas(resultado.tareas);
        console.log(tareas)
    }
    
    
    
    async function crearTareas() {
        let seCreo = false;
        const data = {
            nombre: nombre,
            responsable: responsable
        }
        //Validacion de producto ya existente
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].nombre == nombre) {
                seCreo = true;
                return;
            }
        }

        if (seCreo == false) {
            let result = await fetch("http://localhost:4000/crearTarea", {
                method: "POST",
                body: {data}
            })
            
            tareas.push({data});
            // socket.emit("tareaCreada", {data});
            console.log(data)
        }
    }
        async function crearTareas() {
        let seCreo = false;
        const data = {
            nombre: nombre,
            responsable: responsable
        }
        //Validacion de producto ya existente
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].nombre == nombre) {
                seCreo = true;
                return;
            }
        }

        if (seCreo == false) {
            let result = await fetch("http://localhost:4000/crearTarea", {
                method: "POST",
                body: {data}
            })
            
            tareas.push({data});
            // socket.emit("tareaCreada", {data});
            console.log(data)
        }
    }
    async function envioEstado() {
        const data = {
            estado: estado
        };
        socket.emit('pingAll', {data});
        console.log(data)
    }





    return(
        <>
        <div>
            <input type="text" onChange={(e)=> setNombre(e.target.value)}placeholder="escribi nombre tarea"></input>
            <input type="text" onChange={(e)=> setResponsable(e.target.value)}placeholder="escribi a resposable tarea"></input>
        </div>
        <button onClick={crearTareas} text="Crear tareas"></button>
        <div>
        <input type="text" placeholder="escriba la tarea"></input>
        
        <select onChange={(e)=>setEstado(e.target.value)}> 
            <option value="pendiente">pendiente</option>
            <option value="en proceso">en proceso</option>
            <option value="realizada">realizada</option>
        </select>
        <button onClick={envioEstado}>enviar aviso</button>
        </div>
        
        
        
        </>
    )


}
