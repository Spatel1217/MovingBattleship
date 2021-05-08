<template>
  <div class="banner" v-if="seen">
    {{ message(win) }}
  </div>
</template>

<script>
export default {
  name: "WinBanner",
  data() {
    return {
      seen: false,
      win: -1,
      playerNumber: 0,
    }
  },
  methods: {
    message(win){
      if (this.playerNumber !== 0) {
        if (win === this.playerNumber ) { // Win
          return "You Won! You sunk all of the opponents' ships!"
        }
        else { // Lose
          return "You Lost! The enemy sunk all of your ships!"
        }
      } else {
        if (win === 1) { // Win
          return "Player 1 Wins!"
        }
        if (win === 2) { // Lose
          return "Player 2 Wins!"
        }
      }

    }
  },
  mounted() {
    this.emitter.on('player-number', (data) => {
      this.playerNumber = data;
    })
    this.emitter.on('game-over', (winnerID) => {
      this.win = winnerID;
      this.seen = true;
    })
  }

}
</script>

<style scoped>
.banner {
  position: absolute;
  z-index: 100;
  top: 40vh;
  left: 10vw;
  /*transform: translate(-50%, -50%);*/
  color: gold;
  background-color: blue;
  font-family: "Copperplate", fantasy;
  font-size: 400%;
  text-align: center;
  width: 80vw;
}
</style>