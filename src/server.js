//Adapted from index.js in Competitive 2048 Demo
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.Server(app);

// var boatGroup = new BoatGroup()
// var boat = new Boat(3,3,4,0);
// boatGroup.addBoat(boat);

let hitMap = Array.from({ length: 10}, () =>
    Array.from({length: 10}, () => false)
);

const io = require("socket.io")(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: false
    }
}); // Attach socket.io to our server
app.use(cors())

server.listen(3000, () => console.log('server started'));

const connections = [null, null];

// Handle a socket connection request from web client
io.on('connection', function (socket) {
    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
        }
    }
    connections[playerIndex] = socket;
    console.log('Player ' + playerIndex + ' Connected')
    socket.broadcast.emit('player-connect', playerIndex);
    socket.emit('player-number', playerIndex);

    // When client does something
    socket.on('actuate', function (data) {
        console.log(`Actuation from ${playerIndex}`);

        const {command, target, id } = data;
        let targetx = parseInt(target.charCodeAt(0)-97)
        let targety = parseInt(target.substring(1))-1
        if (command == 'fire') {
            console.log('fired ' + targetx +','+ targety)
            hitMap[targetx][targety]=true
        } else if (command == 'move') {
            // do something like this:
            // boats.get(id).move([targetx, targety])
            console.log(id)
        }

        const move = {
            playerIndex,
            command,
        };

        // Emit the move to all other clients
        io.emit('move', move);
        io.emit('board-change', {hitMap});
    });

    socket.on('disconnect', function () {
        console.log(`Player ${playerIndex} Disconnected`);
        connections[playerIndex] = null;
    });
});