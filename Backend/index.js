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
app.get('/PlayerXUserDetalles', async function (req, res) {
    // console.log("Soy el pedido PlayerXUserDetalles");
    // console.log(req.query);

    const userId = req.query.userID;

    if (!userId) {
        return res.status(400).send({ message: "UserID es requerido" });
    }

    try {
        const respuestaJugadores = await MySQL.realizarQuery(`
            SELECT PlayerId FROM PlayerUserFutbolitos WHERE UserId = '${userId}';
        `);
        // console.log("Respuesta de la consulta de jugadores:", respuestaJugadores);

        if (respuestaJugadores.length > 0) {
            const conjuntoPlayers = respuestaJugadores.map(row => row.PlayerId);
            // console.log("IDs de jugadores:", conjuntoPlayers);
            const jugadoresDetallesPromises = conjuntoPlayers.map(playerId =>
                MySQL.realizarQuery(`
                    SELECT * FROM PlayerFutbolitos WHERE PlayerId = ${playerId};
                `)
            );
            const jugadoresDetalles = await Promise.all(jugadoresDetallesPromises);
            const jugadores = jugadoresDetalles.flat(); 
            // console.log("ggggggggg gggg ", jugadores)

            res.send(jugadores);
        } else {
            res.send({ message: "No se encontraron jugadores para este usuario" });
        }
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send({ message: "Error al realizar la consulta" });
    }
});

// ABRIR SOBRE //
app.post('/AbriSobre', async function (req, res) {
    const { userId, playerIds } = req.body;
    console.log(userId)
    console.log(playerIds)

    if (!userId || !Array.isArray(playerIds)) {
        return res.status(400).send("UserId y playerIds son requeridos.");
    }

    try {
        const insertPromises = playerIds.map(playerId => {
            return MySQL.realizarQuery(`INSERT INTO PlayerUserFutbolitos (UserId, PlayerId) VALUES ('${userId}', '${playerId}')`);
        });

        const results = await Promise.all(insertPromises);
        console.log(results)
        res.send(results);
    } catch (error) {
        console.error("Error al insertar jugadores:", error);
        res.status(500).send("Error al insertar jugadores.");
    }
});

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

// ADMINISTRACION DE EQUIPO || BATTLE //
app.get('/EquipoDefinido', async function (req, res) {
    const playersId = req.query.playersId; // Obtén el ID de los jugadores desde la consulta
    console.log(req.query);
    console.log("El equipo es: ", playersId)

    try {
        // Realiza la consulta en la base de datos para obtener los jugadores por ID
        const respuesta = await MySQL.realizarQuery(`SELECT * FROM PlayerFutbolitos WHERE PlayerId IN (${playersId});`);
        // console.log(respuesta);
        res.json(respuesta); // Envía la respuesta en formato JSON
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).send("Error al obtener los jugadores.");
    }
});

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
            if (data.room && data.room.length > 0) {
                socket.leave(data.room);
            }
            socket.join(data.room);
            sesionActual.chatCode = data.room;
            console.log("Entraste a ", data.room);

            io.to(data.room).emit('entroSala', { room: data.room, success: true });

            const clients = io.sockets.adapter.rooms.get(data.room);
            if (clients && clients.size === 2) {
                io.to(data.room).emit('startGame');
            }
        } else {
            codigos.push(data.room);
            // req.session.room = data.room;
            socket.join(data.room);
            sesionActual.chatCode = data.room;
            console.log("No existía la Sala. Se creó la sala ", sesionActual.chatCode);

            io.to(data.room).emit('salaCreada', { room: data.room, success: true });
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



app.get('/Ranking', async function (req, res) {
    console.log(req.query)
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM Ranking;`)
    res.send(respuesta)
})
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


