// CONCIOEERTO QUILMES https://quilmesrock.enigmatickets.com/


// Paquetes instalados: -g nodemon, express, body-parser, mysql2, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024

// Cargo librerías instaladas y necesarias
const LISTEN_PORT = 4000;
const codigos = []
const express = require('express');
const bodyParser = require('body-parser');
const MySQL = require('./modulos/mysql');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = app.listen(LISTEN_PORT, () => {
    console.log(`Servidor NodeJS corriendo en http://localhost:${LISTEN_PORT}/`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

const sessionMiddleware = session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
});
/*
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});*/

app.use(sessionMiddleware);

let sesionActual = {
    UserId: 0,
    currentContact: 0,
    PlayerId: [],
    chatCode: 0
}


// PROYECTO FUTBOLITOS //

// USUARIOS

// LOGIN //
app.get('/Usuario', async function (req, res) {
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM UserFutbolitos;`)
    res.send(respuesta)
})
app.post('/ExisteUsuario', async function (req, res) {
    console.log(req.body)
    const respuesta = await MySQL.realizarQuery(`SELECT UserId FROM UserFutbolitos WHERE UserName = '${req.body.UserName}' AND UserPassword = '${req.body.UserPassword}';`)
    if (respuesta.length > 0) {
        req.session.userId = respuesta[0].UserId // A REVISAR // 
        console.log("El user id es: ", respuesta)
        res.send(respuesta) 
    } else {
        res.send({ message: "Registrse, Usuario no encontrado" })
    }
})
// REGISTER //
app.post('/NuevoUser', async function (req, res) {
    console.log(req.body)
    result = await MySQL.realizarQuery(`INSERT INTO UserFutbolitos (UserName, UserPassword, Nombre, Apellido) VALUES ('${req.body.UserName}','${req.body.UserPassword}','${req.body.Nombre}', '${req.body.Apellido}')`);
    res.send(result)
})

// PLAYERS //
app.get('/Player', async function (req, res) {
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM PlayerFutbolitos;`)
    res.send(respuesta)
})

// PLAYERS X USERS//
app.get('/PlayerXUser', async function (req, res) {
    console.log("Soy el pedido PlayerXUser")
    console.log(req.query);
    console.log(req.query.userID);
    const respuesta = await MySQL.realizarQuery(`
        SELECT PlayerId FROM PlayerUserFutbolitos WHERE UserId = '${req.query.userID}';
    `);
    console.log("aaaa",  respuesta)
    if (respuesta.length > 0) {
        const conjuntoPlayers = respuesta.map(row => row.PlayerId);
        console.log(conjuntoPlayers)
        console.log(req.query.userID)
        res.send({ players: conjuntoPlayers[0] });
    } else {
        console.log(req.query.userID)
        res.send({ message: "No se encontraron contactos para este usuario" });
    }
});

app.get('/PlayerXUserDos', async function (req, res) {
    console.log(req.query);
    console.log("hola", req.query.playerID);
    const respuesta = await MySQL.realizarQuery(`
        SELECT * FROM PlayerFutbolitos WHERE PlayerId = ${req.query.playerID} );
    `);
    if (respuesta.length > 0) {
        console.log(respuesta);
        res.send(respuesta);
    } else {
        res.send({ message: "Tenemos problemas en este momento..." });
    }
})
///////////////////////////////////////////////////
//LO QUE DIJO CHATI
app.get('/PlayerXUserDetalles', async function (req, res) {
    console.log("Soy el pedido PlayerXUserDetalles");
    console.log(req.query);
    
    const userId = req.query.userID;

    if (!userId) {
        return res.status(400).send({ message: "UserID es requerido" });
    }

    try {
        // Obtener los IDs de los jugadores para el usuario
        const respuestaJugadores = await MySQL.realizarQuery(`
            SELECT PlayerId FROM PlayerUserFutbolitos WHERE UserId = '${userId}';
        `);
        console.log("Respuesta de la consulta de jugadores:", respuestaJugadores);

        if (respuestaJugadores.length > 0) {
            const conjuntoPlayers = respuestaJugadores.map(row => row.PlayerId);
            console.log("IDs de jugadores:", conjuntoPlayers);

            // Obtener los detalles de cada jugador
            const jugadoresDetallesPromises = conjuntoPlayers.map(playerId => 
                MySQL.realizarQuery(`
                    SELECT * FROM PlayerFutbolitos WHERE PlayerId = ${playerId};
                `)
            );

            // Esperar a que todas las promesas se resuelvan
            const jugadoresDetalles = await Promise.all(jugadoresDetallesPromises);
            const jugadores = jugadoresDetalles.flat(); // Aplana el resultado

            res.send(jugadores);
        } else {
            res.send({ message: "No se encontraron jugadores para este usuario" });
        }
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send({ message: "Error al realizar la consulta" });
    }
});
////////////////////////////////////////////////////
/*import { useEffect, useState } from "react";
import styles from "./Paquete.module.css";
import Card from "./Card";

export default function Paquete() {
    const [cincoJugadores, setCincoJugadores] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userID"); // Obtener el ID del usuario

        const fetchJugadores = async () => {
            try {
                const response = await fetch(`http://localhost:4000/PlayerXUserDetalles?userID=${userId}`);
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setCincoJugadores(data);
                    localStorage.setItem("jugadores", JSON.stringify(data)); // Guardar en localStorage
                } else {
                    console.log("No se encontraron jugadores o no son válidos");
                }
            } catch (error) {
                console.error("Error al obtener los jugadores:", error);
            }
        };

        fetchJugadores();
    }, []);

    return (
        <div className={styles.ConjuntoCartas}>
            {cincoJugadores.map((jugador) => (
                <Card
                    key={jugador.PlayerId}
                    isSmall={true}
                    posicion={jugador.Posicion}
                    nacionalidad={jugador.Nacionalidad}
                    imagenJugador={jugador.Imagen}
                    escudo={jugador.Equipo}
                    nombreJugador={`${jugador.Nombre} ${jugador.Apellido}`}
                    ataque={jugador.Ataque}
                    control={jugador.Control}
                    defensa={jugador.Defensa}
                />
            ))}
        </div>
    );
} */
////////////////////////////////////////////////////////////////

// SALAS //
app.get('/Salas', async function (req, res) {
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM SalasFutbolitos;`)
    res.send(respuesta)
})

// NUEVA SALA //
app.post('/NuevaSala', async function (req, res) {
    console.log(req.body)
    result = await MySQL.realizarQuery(`INSERT INTO SalasFutbolitos (Codigo) VALUES ('${req.body.Codigo}')`);
    res.send(result)
})


app.get('/', (req, res) => {
    console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.post('/login', (req, res) => {
    console.log(`[REQUEST - ${req.method}] ${req.url}`);
});

app.delete('/login', (req, res) => {
    console.log(`[REQUEST - ${req.method}] ${req.url}`);
    res.send(null);
});

io.on("connection", (socket) => {
    const req = socket.request;

    socket.on('joinRoom', data => {
        if (existeSala(data.room)) {
            if (req.session.room && req.session.room.length > 0) {
                socket.leave(req.session.room);
            }
            req.session.room = data.room;
            socket.join(req.session.room);
            sesionActual.chatCode = data.room;
            console.log("Entraste a ", data.room);

            io.to(req.session.room).emit('entroSala', { room: req.session.room, success: true });

            const clients = io.sockets.adapter.rooms.get(req.session.room);
            if (clients && clients.size === 2) {
                io.to(req.session.room).emit('startGame');
            }
        } else {
            codigos.push(data.room);
            req.session.room = data.room;
            socket.join(req.session.room);
            sesionActual.chatCode = req.session.room;
            console.log("No existía la Sala. Se creó la sala ", sesionActual.chatCode);

            io.to(req.session.room).emit('salaCreada', { room: req.session.room, success: true });
        }
    });

    socket.on('pingAll', data => {
        console.log("PING ALL: ", data);
        io.emit('pingAll', { event: "Ping to all", message: data });
    });

    socket.on('sendMessage', data => {
        io.to(req.session.room).emit('newMessage', { Fecha: data.Fecha, Contenido: data.Contenido, userEnvia: data.UserEnvia, userRecibe: data.UserRecibe });
    });

    socket.on('disconnect', () => {
        console.log("Disconnect");
    });
});

function existeSala(room) {
    return codigos.includes(room);
}


// //CHATS
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


