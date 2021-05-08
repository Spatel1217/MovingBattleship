<template>
  <div class="frame">
  <header class="heading">
    Players Connected:
  </header>
  <p class="p1">
    {{p1Status()}}
  </p>
  <p class="p2">
    {{p2Status()}}
  </p>
  <p class="spectators">
    {{spectStatus()}}
  </p>
  </div>
</template>

<script>
export default {
  name: "ConnectionStatus",
  data () {
    return {
      playerNumber: 0,
      player1Connected: false,
      player2Connected:false,
      spectators:0,
    }
  },
  methods: {
    connection() { // Checks connection data
      this.emitter.on('player-number', (data) => { // Set playerNumber
        this.playerNumber= data;
      })
      this.emitter.on('player-connect', (data) => { // Update connection details
        if (data===1 && this.player1Connected === false) { // New Player 1 Join
          this.player1Connected = true;
        } else if (data === 2 && this.player2Connected === false) { // New Player 2 Join
          this.player2Connected = true;
        } else if (data === 0 && this.player1Connected === true && this.player2Connected === true) {
          this.spectators++;
        }
      })
    },
    p1Status() {
      if (this.playerNumber === 1) {
        return "Player 1 Connected (You)"
      } else if (this.player1Connected === true) {
        return "Player 1 Connected"
      } else if (this.player1Connected === false) {
        return "Waiting for player..."
      }
    },
    p2Status() {
      if (this.playerNumber===2) {
        return "Player 2 Connected (You)"
      } else if (this.player2Connected === true) {
        return "Player 2 Connected"
      } else if (this.player2Connected === false) {
        return "Waiting for player..."
      }
    },
    spectStatus() {
      if (this.spectators > 0) {
        return "Spectators: " + this.spectators;
      }
    }

  },
}
</script>

<style scoped>
.frame {
  position: relative;
  /*float: right;*/
  border: solid black 1px;
  margin-left: 200px;
  margin-top: 200px;
  width: 200px;



}

</style>