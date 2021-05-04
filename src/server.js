//Adapted from index.js in Competitive 2048 Demo


const express = require('express');
const http = require('http');
const cors = require('cors');
const BoatGroup = require("./classes/BoatGroup");
const Boat = require("./classes/Boat");
console.log("----------------->", BoatGroup);
console.log("----------------->", Boat);

const app = express();
const server = http.Server(app);

// eslint-disable-next-line no-unused-vars
let boatGroup = new BoatGroup()
// eslint-disable-next-line no-unused-vars
let boat = new Boat(3,3,4,0);
// boatGroup.addBoat(boat);

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

let hitMap = Array.from({ length: 10}, () =>
    Array.from({length: 10}, () => false)
);

// Handle a socket connection request from web client
io.on('connection', (socket) => {
    io.emit('board-change', {hitMap});

    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
            break;
        }
    }

    connections[playerIndex] = socket;
    let playerNumber = parseInt(playerIndex) + 1
    console.log('Player ' + playerNumber + ' Connected')
    socket.broadcast.emit('player-connect', playerNumber);
    socket.emit('player-number', playerIndex);

    // When client does something
    socket.on('actuate', (data) => {
        console.log(`Actuation from ${playerIndex}`);

        const regExp = /^(fire) ([a-j]|[A-J])([1-9]|10)$/ig
        const matches = regExp.exec(data)

        if (matches != null && matches[1].toLowerCase() === "fire") {
            const letter = matches[2]
            let targetx = letter.charCodeAt(0)-97 // translate A-J to numerical grid position
            const number = matches[3]
            let targety = number-1
            //send something back to commandbox to push the FIRING
            socket.emit('firing', {target: letter, number})
            console.log('fired ' + targetx +','+ targety)
            hitMap[targetx][targety]=true
        } else {
            //send something back to commandbox to push DIDNT RECOGNIZE
            socket.emit('fire error', data)
        }


        const move = {
            playerIndex,
            command,
        };

        // Emit the player action to all other clients
        io.emit('move', move);
        io.emit('board-change', {hitMap});
    });

    socket.on('reset-board', () => {
        //reset hitMap
        hitMap = Array.from({ length: 10}, () =>
            Array.from({length: 10}, () => false)
        );
        io.emit('board-change', {hitMap});
    })

    socket.on('disconnect', () => {
        console.log(`Player ${playerNumber} Disconnected`);
        connections[playerIndex] = null;
    });
});
