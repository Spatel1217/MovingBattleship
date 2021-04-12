<template>
  <div>
    <label>Commands:</label>
    <div v-for="order in previousCommands" :key="order" class="chat">
      {{ order }}
    </div>
    <input type="text" v-model="currentCommand" @keyup.enter="registerCommand">
  </div>
  <div v-if="inputError" class="error">
    {{ inputError }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCommand: '',
      previousCommands: [],
      inputError: ''
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

  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>