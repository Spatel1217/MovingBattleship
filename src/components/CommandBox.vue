<template>
  <div class="box">
    <label>Commands:</label>
    <div class="scroll">
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
      currentCommand: '',
      previousCommands: [],
      emitters: false, //tracks if the emitters have been made already
      stopCommands: false
    }
  },
  methods: {
    registerCommand() { //logic for checking commands for validity should also go here

      this.emitter.emit('send-command', {command: this.currentCommand})

      if (!this.emitters) {
        this.emitters = true

        //listens for fire confirmation
        this.emitter.on('fire-confirm', (data) => {
          console.log("fire confirm")
          if (data.target[2] === 'hit') {
            this.previousCommands.push('Hit: ' + data.target[0] + data.target[1])
          } else if (data.target[2] === 'miss') {
            this.previousCommands.push('Missed: ' + data.target[0] + data.target[1])
          } else if (data.target[2] === 'destroyed') {
            this.previousCommands.push('Destroyed Boat At: ' + data.target[0] + data.target[1])
          }
        })

        this.emitter.on('game-over', () => {
          this.stopCommands = true
        })

        this.emitter.on('new-game', () => {
          this.stopCommands = false
          this.previousCommands.push('Starting new Game...')
        })
      }

      //this is for testing
      if (this.currentCommand === 'reset') {
        this.emitter.emit('reset')
      }

      this.currentCommand = ''
    },
    mounted() {
    },
    updated() {
    }
  }
}
</script>

<style scoped>
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
  /*margin-bottom: 5px;*/
  width: 100%;
}

.scroll {
  position: relative;
  overflow-y: auto;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: monospace;
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
</style>
