<template>
  <div class="box">
    <label class="title">Commands:</label>
    <div class="scroll" id="history">
      <div v-for="order in previousCommands" :key="order" class="chat">
        {{ order }}
      </div>
    </div>
    <input type="text" v-model="currentCommand" @keyup.enter="registerCommand" v-if="!stopCommands"
           placeholder="Enter a Command">
  </div>
</template>

<script>

export default {
  data() {
    return {
      playerNumber: -1,
      currentCommand: '',
      previousCommands: [],
      emitters: false, //tracks if the emitters have been made already
      stopCommands: false
    }
  },
  methods: {
    registerCommand() { //send command and clear input
      this.emitter.emit('send-command', {command: this.currentCommand})
      if (this.currentCommand === 'reconnect') {
        this.emitter.emit('reconnect')
      }
      // if (this.currentCommand === 'reset') {
      //   this.emitter.emit('reset')
      // }
      this.currentCommand = ''
      this.scrollDown()
    },
    setupListeners() {
      //listens for fire confirmation
      this.emitter.on('fire-confirm', (data) => {
        if (data.target[2] === 'hit') {
          this.previousCommands.push('Hit: ' + data.target[0] + data.target[1])
        } else if (data.target[2] === 'miss') {
          this.previousCommands.push('Missed: ' + data.target[0] + data.target[1])
        } else if (data.target[2] === 'destroyed') {
          this.previousCommands.push('Destroyed Boat At: ' + data.target[0] + data.target[1])
        } else if (data.target[2] === 'already-fired') {
          this.previousCommands.push('Can\'t fire at ' + data.target[0] + data.target[1] + ' again')
        }
      })
      this.emitter.on('fire-error', (data) => {
        if(data.error === 'unknown-command') {
          this.previousCommands.push('Didnt recognize command: \'' + data.command + '\'')
        } else if (data.error === 'need-more-players') {
          this.previousCommands.push('Waiting for second player...')
        }
      })

      this.emitter.on('game-over', (winner) => {
        this.previousCommands.push('Game Over, Player ' + winner + ' won!')
        this.stopCommands = true
        this.scrollDown()
      })

      this.emitter.on('new-game', () => {
        this.stopCommands = false
        this.previousCommands.push('Starting new Game...')
      })

      this.emitter.on('player-number', (playerNumber) => {
        this.playerNumber = playerNumber
        if(playerNumber > 0) {
          this.previousCommands.push('Connected as Player ' + playerNumber)
        } else {
          this.previousCommands.push('Connected as Spectator, Player 1\'s board is on the left')
          this.stopCommands = true
        }
      })

      this.emitter.on('logoff', (logoff) => {
        this.previousCommands.push(logoff.reason)
        this.previousCommands.push('Type \'reconnect\' to rejoin')
      })

      this.emitter.on('player-connect', playerNumber => {
        if(playerNumber > 0 && playerNumber !== this.playerNumber && this.playerNumber !== -1) {
          this.previousCommands.push('Player ' + playerNumber + ' connected')
        }
        this.scrollDown()
      })

      this.emitter.on('player-disconnect', playerNumber => {
        if(playerNumber > 0 && playerNumber !== this.playerNumber) {
          this.previousCommands.push('Player ' + playerNumber + ' disconnected')
        }
        this.scrollDown()
      })
    },
    scrollDown() {
      //Inelegant way to scroll after changes propagate through command history, doesn't scroll to new bottom if round-trip latency > timeout length
      setTimeout(function () {
        console.log('scrolling down')
        let scroll = document.getElementById('history');
        scroll.scrollTop = scroll.scrollHeight;
      }, 100);
    }
  },
  mounted() {
    this.setupListeners()
  }
}
</script>

<style scoped>
* {
  font-family: monospace;
}

input {
  display: block;
  padding: 5px 6px;
  box-sizing: border-box;
  border: 3px solid #151513;
  width: 100%;
}

.chat {
  padding: 1px 1px 5px 5px;
  border-top: 1px solid black;
  width: 99%;
}

.scroll {
  position: relative;
  overflow-y: auto;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/*Encompasses the whole Command Box*/
.box {
  position: relative;
  border: 5px double;
  border-radius: 5px;
  height: 20%;
  width: 70%;
  margin-top: 40vh;
  margin-right: 15%;
  margin-left: 15%;
}

.title {
  font-weight: bold;
  font-size: larger;

  /*From https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>
