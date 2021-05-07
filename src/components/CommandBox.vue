<template>
    <div class="box">
      <label>Commands:</label>
      <div class="scroll">
        <div v-for="order in previousCommands" :key="order" class="chat">
          {{ order }}
        </div>
      </div>
      <input type="text" v-model="currentCommand" @keyup.enter="registerCommand" placeholder="Enter a Command">
    </div>
</template>

<script>

export default {
  data() {
    return {
      currentCommand: '',
      previousCommands: [],
      emitters: false
    }
  },
  methods: {
    registerCommand() { //logic for checking commands for validity should also go here
      /* this is blocked out to test server-side verification
      //^(fire) ([a-j]|[A-J])([1-9]|10)$ <- regex to match fire commands
      //^(move) (ship[1-5]) (up|down|left|right) ([1-9])$
      const regExp = /^(fire) ([a-j]|[A-J])([1-9]|10)$/ig
      const matches = regExp.exec(this.currentCommand)
      this.previousCommands.push(matches) //for debugging matches
      if (matches != null && matches[1].toLowerCase() === "fire") {
        const letter = matches[2]
        const number = matches[3]
        this.previousCommands.push('FIRING ' + letter + number)
      } else {
        this.previousCommands.push('Didn\'t recognize command: ' +this.currentCommand)
      }
      this.currentCommand = ''
      this.autoScroll()
      */

      this.emitter.emit('send-command', {command: this.currentCommand})

      if(!this.emitters) {
        this.emitters = true

        //listens for fire confirmation
        this.emitter.on('fire-confirm', (data) => {
          console.log("fire confirm")
          this.previousCommands.push('Shot at: ' + data.target[0] + data.target[1])
        })

        //listen for an error with firing
        this.emitter.on('fire failure', (data) => {
          this.previousCommands.push('Didn\'t recognize command: ' +data.command)
        })
      }

      //this is for testing
      if(this.currentCommand === 'reset') {
        this.emitter.emit('reset')
      }

      this.currentCommand = ''
      // this.autoScroll()
    },
    // var scrolled = false;
    autoScroll() {
      // var container = this.querySelector("scroll");
      // var scrollHeight = container.scrollHeight;
      // // var container = this.getElementById('scroll').lastItem
      // container.scrollTop = scrollHeight;
      // this.getElementsByClassName('scroll').scrollHeight = this.lastCommand.offsetHeight + this.lastCommand.offsetHeight
    },
    mounted() {
      // this.autoScroll();
    },
    updated() {
      // this.autoScroll()
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
}

/*Encompasses the whole Command Box*/
.box {
  position: relative;
  border: 5px double ;
  border-radius: 5px;
  height: 20%;
  width: 70%;
  margin-top: 250px;
  margin-right: 15%;
  margin-left: 15%;
}
</style>
