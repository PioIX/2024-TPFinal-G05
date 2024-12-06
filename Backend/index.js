// Paquetes instalados: -g nodemon, express, body-parser, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024

// Cargo librerías instaladas y necesarias
const express = require('express');						// Para el manejo del web server
const bodyParser = require('body-parser'); 				// Para el manejo de los strings JSON
const session = require('express-session');				// Para el manejo de las variables de sesión
const cors = require('cors');


const app = express();                                  // Inicializo express para el manejo de las peticiones

app.use(cors());            							// Inicializo express para el manejo de las peticiones

app.use(bodyParser.urlencoded({ extended: false }));	// Inicializo el parser JSON
app.use(bodyParser.json());

const LISTEN_PORT = 4000;								// Puerto por el que estoy ejecutando la página Web

const server = app.listen(LISTEN_PORT, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		//origin: ['http://localhost:3000',"http://localhost:3001"],            	// Permitir el origen localhost:3000
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],  	// Métodos permitidos
		credentials: true                           	// Habilitar el envío de cookies
	}
});

const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)<

let tareas = 
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

let productos = 
[{
		nombre: "Hamburguesa",
		precio: 10000,
	},
	{
		nombre:	"Papas fritas",
		precio: 6000,
	},
	{
		nombre: "Cono de helado",
		precio: 2000,
	}
]

app.get('/', (req, res) => {
	console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.get('/tareas' , function(req,res) {
	res.send({tareas: tareas})
})

app.get('/productos' , function(req,res) {
	res.send({productos: productos})
})

app.post('/crearTarea', function(req,res) {
	try {
        if (req.body.nombre && req.body.responsable) {
            let existe = false
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].nombre === req.body.nombre){
					existe = true
				}
            }
			if (existe) {
				res.send({ mensaje: "La tarea ya existe"});
			} else {
				tareas.push({nombre: req.body.nombre, responsable: req.body.responsable, estado: "Pendiente"})
				res.send({tareas: tareas});
			}
        }
        else {
            console.log("LLEGO ESTO", req.body);
            res.send({ mensaje: "Tuviste un error" , meLlego: req.body});
        }
    }
    catch (err) {
        console.log("LLEGO ESTO", req.body);
        res.send({ mensaje: "Tuviste un error", meLlego: req.body });
    }
})

app.post('/crearProducto', function(req,res) {
	try {
        if (req.body.nombre && req.body.precio) {
            let existe = false
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].nombre === req.body.nombre){
					existe = true
				}
            }
			if (existe) {
				res.send({ mensaje: "El producto ya existe"});
			} else {
				tareas.push({nombre: req.body.nombre, precio: req.body.precio})
				res.send({productos: productos});
			}
        }
        else {
            console.log("LLEGO ESTO", req.body);
            res.send({ mensaje: "Tuviste un error" , meLlego: req.body});
        }
    }
    catch (err) {
        console.log("LLEGO ESTO", req.body);
        res.send({ mensaje: "Tuviste un error", meLlego: req.body });
    }
})


io.on("connection", (socket) => {
	const req = socket.request;

	/*
		Data debe ser: 
		{
			nombre,
			responsable
		}
	*/
	socket.on('tareaCreada', data =>{
		console.log("Tarea creada: ", data);
		io.emit('avisoCreacion', { event: "Creacion de tarea", message: data });
	})

	socket.on('tareaModificada', data =>{
		console.log("Tarea modificada: ", data);
		for (let i = 0; i < tareas.length; i++) {
			if (tareas[i].nombre == data.nombre) {
				tareas[i].estado = data.estado
			}
		}
		io.emit('avisoModificacion', { event: "Modificadion de tarea de tarea", message: data });
	})

	/*
		Data debe ser: 
		{
			nombre,
			precio
		}
	*/
	socket.on('productoCreado', data =>{
		console.log("Producto creado: ", data);
		io.emit('avisoCreacion', { event: "Creacion de producto", message: data });
	})

	socket.on('productoModificado', data =>{
		console.log("Tarea modificada: ", data);
		for (let i = 0; i < productos.length; i++) {
			if (productos[i].nombre == data.nombre) {
				productos[i].precio = data.precio
			}
		}
		io.emit('avisoModificacion', { event: "Modificadion de producto", message: data });
	})

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});


	socket.on('sendMessage', data => {
		io.to(req.session.room).emit('newMessage', { room: req.session.room, message: data });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});



//CHATS
// app.post('/TraerChat', async function (req, res) {
//     console.log(req.body);
//     sesionActual.currentContact = req.body.UserElegido;
//     const respuesta = await MySQL.realizarQuery(`
//         SELECT cu1.ChatCode
//         FROM ChatsWpp cu1
//         JOIN ChatsWpp cu2 ON cu1.ChatCode = cu2.ChatCode
//         WHERE cu1.UserId = '${sesionActual.userId}'
//         AND cu2.UserId = '${req.body.UserElegido}';
//     `);
//     if (respuesta.length > 0) {
//         res.send({ currentId: sesionActual.userId, codigo: respuesta[0].ChatCode });
//     } else {
//         res.send({ message: "No se encontró chat entre estos usuarios." });
//     }
// });

// //USUARIOS
// app.get('/verificoUser', async function (req, res) {
//     console.log(req.query)

//     const respuesta = await MySQL.realizarQuery(`
//     SELECT * FROM UserWpp;
//     `)
//     res.send(respuesta)
// })

// app.post('/Users', async function (req, res) {
//     console.log(req.body)
//     const respuesta = await MySQL.realizarQuery(`
//     SELECT UserId FROM UserWpp WHERE UserName = '${req.body.UserName}' AND UserPassword = '${req.body.UserPassword}';
//     `)
//     if (respuesta.length > 0) {
//         sesionActual.UserId = respuesta[0].UserId
//         res.send(respuesta)
//     } else {
//         res.send({ message: "Registrse, Usuario no encontrado" })
//     }
// })

// app.post('/NuevoUser', async function (req, res) {
//     console.log(req.body)
//     result = await MySQL.realizarQuery(`INSERT INTO UserWpp (UserName, UserPassword, Nombre, Apellido) VALUES ('${req.body.UserName}','${req.body.UserPassword}','${req.body.Nombre}', '${req.body.Apellido}')`);
//     // res.send("ok")
// })

// //DIRECCION CONTACTO
// app.get('/ContactoXUser', async function (req, res) {
//     console.log(req.query);
//     const respuesta = await MySQL.realizarQuery(`
//         SELECT ContactoId FROM ContactosUserWpp WHERE UserId = '${sesionActual.userId}';
//     `);

//     if (respuesta.length > 0) {
//         sesionActual.contactoId = respuesta.map(row => row.ContactoId); // Guardar los ContactoId en un array
//         console.log(sesionActual.userId)
//         console.log(sesionActual.contactoId)
//         res.send({ currentId: sesionActual.userId, contactos: sesionActual.contactoId });
//     } else {
//         console.log(sesionActual.userId)
//         res.send({ message: "No se encontraron contactos para este usuario" });
//     }
// });

// //CONTACTOS
// app.get('/Contactos', async function (req, res) {
//     const respuesta = await MySQL.realizarQuery(`
//         SELECT * FROM ContactosWpp WHERE ContactoId IN (${sesionActual.contactoId.join(',')});
//     `);
//     if (respuesta.length > 0) {
//         console.log(respuesta);
//         res.send(respuesta);
//     } else {
//         res.send({ message: "Agregue un Contacto" });
//     }
// })

// app.post('/EnvioContacto', async function (req, res) {
//     console.log(req.body)
//     result = await MySQL.realizarQuery(`INSERT INTO ContactosWpp (nombre, apellido, numeroTelefono, contactName) VALUES ('${req.body.nombre}','${req.body.apellido}','${req.body.numeroTelefono}', '${req.body.contactName}')`);
//     // res.send("ok")
// })

// app.get('/Chats', async function (req, res) {
//     console.log(req.query)
//     const respuesta = await MySQL.realizarQuery(`
//     SELECT * FROM ChatsWpp;
//     `)
//     res.send(respuesta)
// })

// //DIRECCION CHATS
// app.get('/DireccionChat', async function (req, res) {
//     console.log(req.query)
//     const respuesta = await MySQL.realizarQuery(`
//     SELECT * FROM ChatsUserWpp;
//     `)
//     res.send(respuesta)
// })

// //CHATS
// app.get('/Chats', async function (req, res) {
//     console.log(req.query)
//     const respuesta = await MySQL.realizarQuery(`
//     SELECT * FROM ChatsWpp;
//     `)
//     res.send(respuesta)
// })

// app.get('/ChatUsuarios', async function (req, res) {
//     console.log(req.query);

//     const userId1 = req.query.userId1;
//     const userId2 = req.query.userId2;

//     const respuesta = await MySQL.realizarQuery(`
//         SELECT cu1.ChatCode
//         FROM ChatsUserWpp cu1
//         JOIN ChatsUserWpp cu2 ON cu1.ChatCode = cu2.ChatCode
//         WHERE cu1.UserId = ${userId1} AND cu2.UserId = ${userId2};
//     `);

//     res.send(respuesta);
// });

// //MENSAJES
// app.get('/Mensajes', async function (req, res) {
//     console.log(req.query)
//     const respuesta = await MySQL.realizarQuery(`SELECT * FROM MensajesWpp;`)
//     res.send(respuesta)
// })


// app.get('/Mensajes', async function (req, res) {
//     console.log(req.query)
//     const respuesta = await MySQL.realizarQuery(`
//     SELECT * FROM MensajesWpp;
//     `)
//     res.send(respuesta)
// })

// app.post('/EnviarMensaje', async function (req, res) {
//     console.log(req.body)
//     sesionActual.Fecha = req.body.Fecha
//     result = await MySQL.realizarQuery(`INSERT INTO MensajesWpp (Contenido, Fecha, UserEnvia, UserRecibe) VALUES ('${req.body.Contenido}','${req.body.Fecha}', '${req.body.UserEnvia}', '${req.body.UserRecibe}')`);
//     // res.send("ok")
// })


