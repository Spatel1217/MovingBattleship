<template>
  <div class="frame">
    <header class="heading">
      {{ boxHeader }}
    </header>
    <p class="p1">
      {{ p1Status }}
    </p>
    <p class="p2">
      {{ p2Status }}
    </p>
    <p class="spectators">
      {{ spectStatus() }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ConnectionStatus",
  data() {
    return {
      playerNumber: -1,
      player1Connected: false,
      player2Connected: false,
      p1Status: "Waiting for player...",
      p2Status: "Waiting for player...",
      spectators: 0,
      connected: false,
      boxHeader: 'Players Connected:',
    }
  },
  methods: {
    connection() { // Sets up connection listeners
      this.emitter.on('player-number', (data) => { // Set playerNumber on assignment
        this.playerNumber = data;
        this.connected = true;
        this.boxHeader = 'Players Connected:';
        if (data === 1) {
          this.updateP1Status(true);
        } else if (data === 2) {
          this.updateP2Status(true);
        }
      })
      this.emitter.on('player-connect', (data) => { // Update connection details
        // only update status if connection is not us
        if (data !== this.playerNumber) {
          if (data === 1) { // New Player 1 Join
            this.updateP1Status(true)
          } else if (data === 2) { // New Player 2 Join
            this.updateP2Status(true)
          } else if (data === 0 && this.player1Connected === true && this.player2Connected === true) {
            this.spectators++;
          }
        }
      })
      this.emitter.on('spectator-count', (data) => {
        this.spectators = data;
      })
    },
    disconnection() { // Sets up disconnection listeners
      this.emitter.on('player-disconnect', playerNumber => {
        if (playerNumber === 1) {
          this.updateP1Status(false);
        }
        else if (playerNumber === 2) {
          this.updateP2Status(false);
        }
        else if (playerNumber === 0) {
          this.spectStatus()
        }
      })

      this.emitter.on('logoff', () => {
        this.playerNumber = -1;
        this.connected = false;
        this.updateP1Status(false);
        this.updateP2Status(false);
        this.spectStatus();
        this.boxHeader = 'Disconnected';
      })
    },
    updateP1Status(bool) { //Changes displayed text
      if(this.connected) {
        this.player1Connected = bool;
        if (this.playerNumber === 1) {
          this.p1Status = "Player 1 Connected (You)"
        } else if (this.player1Connected) {
          this.p1Status = "Player 1 Connected"
        } else if (!this.player1Connected) {
          this.p1Status = "Waiting for player..."
        }
      } else {
        this.p1Status = ''
      }
    },
    updateP2Status(bool) {
      if(this.connected) {
        this.player2Connected = bool
        if (this.playerNumber === 2) {
          this.p2Status = "Player 2 Connected (You)"
        } else if (this.player2Connected) {
          this.p2Status = "Player 2 Connected"
        } else if (!this.player2Connected) {
          this.p2Status = "Waiting for player..."
        }
      } else {
        this.p2Status = ''
      }
    },
    spectStatus() {
      if(this.connected) {
        if (this.playerNumber === 0) {
          this.player1Connected = true;
          this.player2Connected = true;
        }
        if (this.spectators > 0) {
          return "Spectators: " + this.spectators;
        }
      }
    },
    setUpListeners() {
      this.connection();
      this.disconnection();
      this.emitter.on('p1-taken', (player1) => {
        this.updateP1Status(player1);
      })
      this.emitter.on('p2-taken', (player2) => {
        this.updateP2Status(player2);
      })
    }
  },
  mounted() {
    this.setUpListeners();
  },
}
</script>

<style scoped>
* {
  font-family: monospace;
}

.frame {
  position: relative;
  border: solid black 1px;
  margin-left: 225px;
  margin-top: 200px;
  width: 200px;

}

</style>