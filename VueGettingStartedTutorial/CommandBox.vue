<template>
  <div>
    <label>Commands:</label>
    <div v-for="order in previousCommands" :key="order" class="chat">
      {{ order }}
    </div>
    <input type="text" v-model="currentCommand" @keyup.enter="registerCommand">
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCommand: '',
      previousCommands: []
    }
  },
  methods: {
    registerCommand() { //logic for checking commands for validity should also go here
      this.previousCommands.push(this.currentCommand)
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
    border: 1px solid #151513;
    width: 25%;
  }
  .chat {
    padding: 1px 1px;
    border: 1px solid black;
    margin-bottom: 5px;
    width: 25%;
  }
</style>