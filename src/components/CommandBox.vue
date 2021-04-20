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

    },
    // var scrolled = false;
    autoScroll() {
      var container = this.querySelector("scroll");
      var scrollHeight = container.scrollHeight;
      // var container = this.getElementById('scroll').lastItem
      container.scrollTop = scrollHeight;
      // this.getElementById('scroll').scrollHeight = this.previousCommands.lastItem.offsetHeight + this.previousCommands.lastItem.offsetHeight
    },
    mounted() {
      this.autoScroll();
    },
    updated() {
      this.autoScroll()
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
  border: 5px double;
  border-radius: 5px;
  height: 20%;
  width: 70%;
  margin-top: 35%;
  margin-right: 15%;
  margin-left: 15%;
}
</style>
