//Adapted from index.js in Competitive 2048 Demo
const express = require('express');
const http = require('http');
const cors = require('cors')

const app = express();
const server = http.Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: false
    }
}); // Attach socket.io to our server
app.use(cors())
// eslint-disable-next-line no-unused-vars
// app.get('/products/:id', function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
// })

server.listen(3000, () => console.log('server started'));

const connections = [null, null];

// Handle a socket connection request from web client
io.on('connection', function (socket) {
    // eslint-disable-next-line no-unused-vars
    // io.on('connection'), (socket) => { console.log("CONNECTED"); }

    console.log('Connected')
    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
        }
    }

    socket.broadcast.emit('player-connect', playerIndex);

    socket.emit('player-number', playerIndex);
    socket.on('actuate', function (data) {
        console.log(`Actuation from ${playerIndex}`);

        const { command } = data; // Get grid and metadata properties from client

        const move = {
            playerIndex,
            command,
        };

        // Emit the move to all other clients
        // socket.broadcast.emit('move', move);
        io.emit('move', move);
    });

    socket.on('disconnect', function() {
        console.log(`Player ${playerIndex} Disconnected`);
        connections[playerIndex] = null;
    });
});