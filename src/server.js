//Adapted from index.js in Competitive 2048 Demo


const express = require('express');
const http = require('http');
const cors = require('cors');
const BoatGroup = require("./classes/BoatGroup");

const app = express();
app.use(cors())
const server = http.Server(app);

let boatGroup

const io = require("socket.io")(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: false
    }
}); // Attach socket.io to our server
server.listen(3000, () => console.log('server started'));
const connections = [null, null];

let maps = []

function resetMaps() {
    for (const i in [0, 1]) {
        //place boats on playerMap
        boatGroup = new BoatGroup()
        maps[i] = boatGroup.representedMap
    }
}
function hitResult(index,x,y) {
    if (maps[(index) % 2][x][y] == 'boat') {
        //check if boat destroyed and set to 'destroyed'
        return 'hit'
    } else if (maps[(index) % 2][x][y] == ''){
        return 'miss'
    }
}

resetMaps()

// Handle a socket connection request from web client
io.on('connection', (socket) => {

    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            connections[i] = socket;
            playerIndex = i
            break;
        }
    }
    let playerNumber = parseInt(playerIndex) + 1;

    console.log('Player ' + playerNumber + ' Connected')
    socket.broadcast.emit('player-connect', playerNumber);
    socket.emit('player-number', playerNumber);
    io.emit('board-change', {maps});

    if (playerNumber != 0) {
        // When client does something
        socket.on('actuate', (data) => {
            console.log(`Actuation from ${playerNumber}`);

            const {command} = data;

            const regExp = /^(fire) ([a-j]|[A-J])([1-9]|10)$/ig
            const matches = regExp.exec(data.command)

            if (matches != null && matches[1].toLowerCase() === "fire") {
                const letter = matches[2]
                let targetX = letter.charCodeAt(0) - 97 // translate A-J to numerical grid position
                const number = matches[3]
                let targetY = number - 1
                //send something back to commandbox to push the FIRING
                socket.emit('firing', {target: [letter, number]}) //change to handle hit and miss message if/else to emit once
                console.log('fired ' + targetX + ',' + targetY)
                //edits the other player's map
                maps[(playerIndex) % 2][targetX][targetY] = hitResult(playerIndex,targetX,targetY)
            } else {
                //send something back to commandbox to push DIDNT RECOGNIZE
                socket.emit('fire error', data)
            }

            const move = {
                playerNumber,
                command,
            };

            // Emit the player action to all other clients
            io.emit('move', move);
            io.emit('board-change', {maps});
        });

        socket.on('reset-board', () => {
            resetMaps()
            io.emit('board-change', {maps});
        })

        socket.on('disconnect', () => {
            console.log(`Player ${playerNumber} Disconnected`);
            connections[playerIndex] = null;
        });
    }
});
