//Adapted from index.js in Competitive 2048 Demo
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.Server(app);

// var boatGroup = new BoatGroup()
// var boat = new Boat(3,3,4,0);
// boatGroup.addBoat(boat);

var hitMap = [];

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

        const {command} = data; // Get grid and metadata properties from client

        const move = {
            playerIndex,
            command,
        };

        // Emit the move to all other clients
        // socket.broadcast.emit('move', move);
        io.emit('move', move);
        io.emit('board-change', {hitMap});
    });
    socket.on('fire', function(data) {
        //^(fire) ([a-j]|[A-J])([1-9]|10)$ <- regex to match fire commands
        //^(move) (ship[1-5]) (up|down|left|right) ([1-9])$
        const regExp = /^(fire) ([a-j]|[A-J])([1-9]|10)$/ig
        const matches = regExp.exec(data) //will this work with no explicit type call??
        // this.previousCommands.push(matches) //for debugging matches
        if (matches != null && matches[1].toLowerCase() === "fire") {
            const letter = matches[2]
            const number = matches[3]
            // this.previousCommands.push('FIRING ' + letter + number)
            io.emit('firing', {letter: letter, number: number})
        } else {
            // this.previousCommands.push('Didn\'t recognize command: ' +this.currentCommand)
            io.emit('fire error', data)
        }
        // this.currentCommand = ''
        // this.autoScroll()
    });
    socket.on('disconnect', function () {
        console.log(`Player ${playerIndex} Disconnected`);
        connections[playerIndex] = null;
    });


});
