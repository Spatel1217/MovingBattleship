<template>
  <button class = "reset" v-if="gameOver" v-on:click="resetGame"> Play Again </button>
</template>

<script>
export default {
name: "ResetButton",
  data: function(){
    return {
      gameOver: false,
    }
  },
  methods: {
      resetGame() {
        this.emitter.emit('play-again', )
        console.log("clicked reset")
      }
  },
  mounted() {
    this.emitter.on('game-over', () => {
      this.gameOver = true;
    })
    this.emitter.on('new-game', () => {
      this.gameOver = false
    })
  }

}
</script>

<style scoped>
.reset{
  position: absolute;
  top: 60vh;
  font-family: monospace;
  font-weight: bold;
}
</style>