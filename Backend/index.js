// CONCIOEERTO QUILMES https://quilmesrock.enigmatickets.com/


// Paquetes instalados: -g nodemon, express, body-parser, mysql2, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024

// Cargo librerías instaladas y necesarias
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
    secret: "supersarasa",
    resave: false,
    saveUninitialized: false
});
app.use(sessionMiddleware);
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

let sesionActual = {
    UserId: 0,
    currentContact: 0, 
    contactoId: [],
    chatCode: 0
}
const LISTEN_PORT = 4000;
const codigos = []

// PROYECTO FUTBOLITOS //

// USUARIOS

// LOGIN //
app.get('/Usuario', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM UserFutbolito;`)
    res.send(respuesta)
})
app.post('/ExisteUsuario', async function(req,res){
    console.log(req.body) 
    const respuesta = await MySQL.realizarQuery(`SELECT UserId FROM UserFutbolito WHERE UserName = '${req.body.UserName}' AND UserPassword = '${req.body.UserPassword}';`)
    if (respuesta.length > 0) {
        sesionActual.UserId = respuesta[0].UserId // A REVISAR // 
        console.log(respuesta)
        res.send(respuesta) // REVISAR QUE ME MANDA //
    } else {
        res.send({message: "Registrse, Usuario no encontrado"})
    }
})
// REGISTER //
app.post('/NuevoUser', async function(req,res) {
    console.log(req.body) 
    result = await MySQL.realizarQuery(`INSERT INTO UserFutbolito (UserName, UserPassword, Nombre, Apellido) VALUES ('${req.body.UserName}','${req.body.UserPassword}','${req.body.Nombre}', '${req.body.Apellido}')`);
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
            if (req.session.room != undefined && req.session.room.length > 0)
                socket.leave(req.session.room);
            req.session.room = data.room;
            socket.join(req.session.room);
            sesionActual.chatCode = data.room;
            console.log("Entraste a ", data.room)

            io.to(req.session.room).emit('entroSala', { room: req.session.room, success: true });
        }
        else {
            codigos.push(data.room)
            req.session.room = data.room;
            socket.join(req.session.room);
            sesionActual.chatCode = req.session.room;
            console.log("No existia la Sala. Se creo la sala ", sesionActual.chatCode)

            io.to(req.session.room).emit('salaCreada', { room: req.session.room, success: true });
        }

    });


	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', data => {
        // console.log(data)
		io.to(req.session.room).emit('newMessage', { Fecha: data.Fecha, Contenido: data.Contenido, userEnvia: data.UserEnvia, userRecibe: data.UserRecibe });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});

function existeSala(room) {
    for (let index = 0; index < codigos.length; index++) {
        if (room == codigos[index]) {
            return true
        }
    }
    return false
}

//CHATS
app.post('/TraerChat', async function(req, res) {
    console.log(req.body);
    sesionActual.currentContact = req.body.UserElegido;
    const respuesta = await MySQL.realizarQuery(`
        SELECT cu1.ChatCode
        FROM ChatsWpp cu1
        JOIN ChatsWpp cu2 ON cu1.ChatCode = cu2.ChatCode
        WHERE cu1.UserId = '${sesionActual.userId}' 
        AND cu2.UserId = '${req.body.UserElegido}';
    `);
    if (respuesta.length > 0) {
        res.send({ currentId: sesionActual.userId, codigo: respuesta[0].ChatCode });
    } else {
        res.send({ message: "No se encontró chat entre estos usuarios." });
    }
});

//USUARIOS
app.get('/verificoUser', async function(req,res){
    console.log(req.query) 
    
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM UserWpp;
    `)
    res.send(respuesta)
})

app.post('/Users', async function(req,res){
    console.log(req.body) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT UserId FROM UserWpp WHERE UserName = '${req.body.UserName}' AND UserPassword = '${req.body.UserPassword}';
    `)
    if (respuesta.length > 0) {
        sesionActual.userId = respuesta[0].UserId
        res.send(respuesta)
    } else {
        res.send({message: "Registrse, Usuario no encontrado"})
    }
})

app.post('/NuevoUser', async function(req,res) {
    console.log(req.body) 
    result = await MySQL.realizarQuery(`INSERT INTO UserWpp (UserName, UserPassword, Nombre, Apellido) VALUES ('${req.body.UserName}','${req.body.UserPassword}','${req.body.Nombre}', '${req.body.Apellido}')`);
    // res.send("ok")
})

//DIRECCION CONTACTO
app.get('/ContactoXUser', async function(req, res) {
    console.log(req.query);
    const respuesta = await MySQL.realizarQuery(`
        SELECT ContactoId FROM ContactosUserWpp WHERE UserId = '${sesionActual.userId}';
    `);

    if (respuesta.length > 0) {
        sesionActual.contactoId = respuesta.map(row => row.ContactoId); // Guardar los ContactoId en un array
        console.log(sesionActual.userId )
        console.log(sesionActual.contactoId)
        res.send({currentId: sesionActual.userId, contactos: sesionActual.contactoId});
    } else {
        console.log(sesionActual.userId )
        res.send({message: "No se encontraron contactos para este usuario"});
    }
});

//CONTACTOS
app.get('/Contactos', async function(req,res){
    const respuesta = await MySQL.realizarQuery(`
        SELECT * FROM ContactosWpp WHERE ContactoId IN (${sesionActual.contactoId.join(',')});
    `);
    if (respuesta.length > 0) {
        console.log(respuesta);
        res.send(respuesta);
    } else {
        res.send({message: "Agregue un Contacto"});
    }
})

app.post('/EnvioContacto', async function(req,res) {
    console.log(req.body) 
    result = await MySQL.realizarQuery(`INSERT INTO ContactosWpp (nombre, apellido, numeroTelefono, contactName) VALUES ('${req.body.nombre}','${req.body.apellido}','${req.body.numeroTelefono}', '${req.body.contactName}')`);
    // res.send("ok")
})

app.get('/Chats', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM ChatsWpp;
    `)
    res.send(respuesta)
})

//DIRECCION CHATS
app.get('/DireccionChat', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM ChatsUserWpp;
    `)
    res.send(respuesta)
})

//CHATS
app.get('/Chats', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM ChatsWpp;
    `)
    res.send(respuesta)
})

app.get('/ChatUsuarios', async function(req, res) {
    console.log(req.query);

    const userId1 = req.query.userId1;
    const userId2 = req.query.userId2;

    const respuesta = await MySQL.realizarQuery(`
        SELECT cu1.ChatCode
        FROM ChatsUserWpp cu1
        JOIN ChatsUserWpp cu2 ON cu1.ChatCode = cu2.ChatCode
        WHERE cu1.UserId = ${userId1} AND cu2.UserId = ${userId2};
    `);

    res.send(respuesta);
});

//MENSAJES
app.get('/Mensajes', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`SELECT * FROM MensajesWpp;`)
    res.send(respuesta)
})


app.get('/Mensajes', async function(req,res){
    console.log(req.query) 
    const respuesta = await MySQL.realizarQuery(`
    SELECT * FROM MensajesWpp;
    `)
    res.send(respuesta)
})

app.post('/EnviarMensaje', async function(req,res) {
        console.log(req.body) 
        sesionActual.Fecha = req.body.Fecha
        result = await MySQL.realizarQuery(`INSERT INTO MensajesWpp (Contenido, Fecha, UserEnvia, UserRecibe) VALUES ('${req.body.Contenido}','${req.body.Fecha}', '${req.body.UserEnvia}', '${req.body.UserRecibe}')`);
        // res.send("ok")
    })


