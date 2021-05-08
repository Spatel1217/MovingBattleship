//Adapted from index.js in Competitive 2048 Demo


const express = require('express');
const http = require('http');
const cors = require('cors');
const BoatGroup = require("./classes/BoatGroup");

const app = express();
app.use(cors())
const server = http.Server(app);

let boatGroups = []

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
let spectators = 0;
let isGameOver = false;
let winningPlayer = -1;

function resetMaps() {
    isGameOver = false;
    winningPlayer = -1;
    spectators = 0;
    for (const i in [0, 1]) {
        //place boats on playerMap
        let boatGroup = new BoatGroup();
        boatGroups[i] = boatGroup;
        maps[i] = boatGroup.representedMap;
    }
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// eslint-disable-next-line no-unused-vars
function newGame() {
    // await sleep(5000);
    resetMaps()
}

function hitResult(index, x, y) {
    if (maps[(index) % 2][x][y] == 'boat') {
        //check if boat destroyed and set to 'destroyed'
        let hitBoat = boatGroups[index % 2].hitBoat(x + 1, y + 1);
        if (hitBoat.isDestroyed()) {
            // set all squares in hit boat to destroyed
            for (const i in hitBoat.getPosition()) {
                maps[(index) % 2][hitBoat.getPosition()[i][0] - 1][hitBoat.getPosition()[i][1] - 1] = 'destroyed';
            }
            if (boatGroups[index % 2].allDestroyed()) {
                console.log("Game Over P" + (index % 2 + 1) + ' Wins!');
                isGameOver = true;
                winningPlayer = (index % 2 + 1)
            }
            return 'destroyed';
        }
        return 'hit'
    } else if (maps[(index) % 2][x][y] == '') {
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
    io.emit('player-connect', playerNumber);
    socket.emit('player-number', playerNumber);
    io.emit('board-change', {maps});
    socket.emit('spectator-count', (spectators));

    //Emit connection spots status
    if (connections[0] !== null) {
        socket.emit('p1-taken', 1);
    }
    if (connections[1] !== null) {
        socket.emit('p2-taken', 1)
    }


    if (playerNumber !== 0) {
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
                let hitRes = hitResult(playerIndex, targetX, targetY)
                socket.emit('firing', {target: [letter, number, hitRes]})  //change to handle hit and miss message if/else to emit once
                console.log('fired ' + targetX + ',' + targetY)
                //edits the other player's map
                maps[(playerIndex) % 2][targetX][targetY] = hitRes;
            } else {
                //send something back to commandbox to push DIDNT RECOGNIZE
                socket.emit('fire error', data);
            }
            if (isGameOver) {
                io.emit("game-over", winningPlayer);
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
            resetMaps();
            io.emit('board-change', {maps});
        });

        socket.on('play-again', () => {
            newGame();
            io.emit('new-game')
            io.emit('board-change', {maps});
        });

    } else {
        spectators++;
        socket.emit('spectator-count', (spectators))
    }

    socket.on('disconnect', () => {
        console.log(`Player ${playerNumber} Disconnected`);

        socket.broadcast.emit('player-disconnect', playerNumber)
        console.log("test")
        if (playerNumber === 0) {
            spectators--;
            socket.emit('spectator-count', (spectators))
        }
        connections[playerIndex] = null;
    });
});
