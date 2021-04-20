<template>
  <div>
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
    }
  },
  methods: {
    registerCommand() { //logic for checking commands for validity should also go here
      this.previousCommands.push(this.currentCommand)
      //^(fire) ([a-j]|[A-J])([1-9]|10)$ <- regex to match fire commands
      const regExp = /^(fire) ([a-j]|[A-J])([1-9]|10)$/ig
      const matches = regExp.exec(this.currentCommand) //check what returns from exec when it fails
      this.previousCommands.push(matches)
      if (matches.length > 0 && matches[1].toLowerCase() === "fire") {
        this.previousCommands.push("hello")
        const letter = matches[2]
        const number = matches[3]
        this.previousCommands.push('FIRING ' + letter + number)
      } else {
        this.previousCommands.push('Didn\'t recognize command')
      }
      this.previousCommands.push("goodbye")
      this.currentCommand = ''
    }
  }
}
</script>

<style scoped>
input {
  display: block;
  padding: 10px 6px;
  box-sizing: border-box;
  border: 3px solid #151513;
  /*width: 25%;*/
}

.chat {
  padding: 1px 1px;
  border: 1px solid black;
  margin-bottom: 5px;
  /*width: 25%;*/
}

.scroll {
  overflow: scroll;
  height: 300px;
  width: 25%;
}
</style>
