// Adapted from Ahoy src/components/Placement/Map.vue

<template>
  <div class="canvas">
    <div class="frame"></div>
    <div class="line" style="margin:-10px">
      <div class="boardLabel">
        Your Board
      </div>
    </div>
    <div class="line">
      <div class="columnLabels"></div>
      <div class="columnLabels" v-for="j in 10" :key="j">
        {{ labelRows(j) }}
      </div>
    </div>
    <!--    <RowLabel/>-->
    <div class="line" v-for="n in 10" :key="n">
      <div class="rowLabels">
        {{ n }}
      </div>
      <div
          class="square"
          :data-y="n"
          :data-x="m"
          v-for="m in 10"
          :key="m"
          v-bind:class="{
            boat: playerMap[m - 1][n - 1] == 'boat',
            hit: playerMap[m - 1][n - 1] == 'hit',
            miss: playerMap[m - 1][n - 1] == 'miss',
            destroyed: playerMap[m - 1][n - 1] == 'destroyed',
          }"
      >
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      socket: null,
      playerMap: Array.from({length: 10}, () =>
          Array.from({length: 10}, () => '')
      ),
      playerNumber: -1,
    }
  },
  methods: {
    resetBoard() {
      this.hitMap = Array.from({length: 10}, () =>
          Array.from({length: 10}, () => false))
    },
    onResize() {
      var target = {x: 250, y: 215, width: 475, height: 475};
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();

      // Get largest dimension increase
      var xScale = windowWidth / 1920;
      var yScale = windowHeight / 1080;
      var scale;
      var yOffset = 0;
      var xOffset = 0;

      if (xScale > yScale) {
        // The image fits perfectly in x axis, stretched in y
        scale = xScale;
        yOffset = (windowHeight - 1080 * scale) / 2;
      } else {
        // The image fits perfectly in y axis, stretched in x
        scale = yScale;
        xOffset = (windowWidth - 1920 * scale) / 2;
      }

      $(".canvas").css("top", target.y * scale + yOffset);
      $(".canvas").css("left", target.x * scale + xOffset);
      $(".canvas").css("width", target.width * scale);
      $(".canvas").css("height", target.height * scale);
      $(".line").css("height", (target.height * scale) / 10);
    },
    labelRows(i) {
      return String.fromCharCode(64 + i)
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    window.dispatchEvent(new Event("resize"))

    const io = require("socket.io-client")
    console.log('connecting...')
    const local = false // change to true for shared server state
    this.socket = local ? io.connect("http://localhost:3000") : io.connect("https://moving-battleships-server.herokuapp.com")
    this.resetBoard()
    //Listen for server-given player number
    this.socket.on('player-number', (playerNumber) => {
      console.log('P' + playerNumber + ' connected')
      this.playerNumber = playerNumber
      this.emitter.emit('player-number', (playerNumber))
    })

    this.socket.on('player-connect', (playerNumber) => {
      this.emitter.emit('player-connect', (playerNumber))
    })

    this.socket.on('player-disconnect', (playerNumber) => {
      this.emitter.emit('player-disconnect', (playerNumber))
    })

    this.socket.on('spectator-count', (spectatorCount) => {
      this.emitter.emit('spectator-count', (spectatorCount))
    })

    this.socket.on('p1-taken', (p1Taken) => {
      this.emitter.emit(p1Taken)
    })

    this.socket.on('p2-taken', (p2Taken) => {
      this.emitter.emit(p2Taken)
    })

    this.emitter.on('send-command', (data) => {
      // console.log('sending command: ' + data.command)
      this.socket.emit('actuate', data)
    })

    this.socket.on('firing', (data) => {
      this.emitter.emit('fire-confirm', data)
    })

    this.socket.on('fire error', (data) => {
      this.emitter.emit('fire failure', data)
    })

    this.emitter.on('reset', () => {
      console.log('resetting')
      this.socket.emit('reset-board')
    })

    this.socket.on('game-over', (winnerID) => {
      this.emitter.emit('game-over', (winnerID))
    })

    this.socket.on('new-game', () => {
      this.emitter.emit('new-game')
    })


    //listen for server broadcasted moves
    this.socket.on('move', (move) => {
      console.log('P' + move.playerNumber + ': ' + move.command)
    })
    this.socket.on('board-change', (boardState) => {
      if (this.playerNumber != 1) {
        this.playerMap = boardState.maps[0]
        this.emitter.emit('enemy-map-update', boardState.maps[1])
      } else {
        this.playerMap = boardState.maps[1]
        this.emitter.emit('enemy-map-update', boardState.maps[0])
      }
      // this.addSquareText()
      console.log(boardState.maps)
    })

  }
}
</script>

<style scoped lang="less">
@grid-size: 420px;

.canvas {
  //transform: rotate(-6deg);
  position: relative;
  z-index: 1;
  //flex:1;
  //float:left;
  //border: 1px solid black;

  &:hover {
    cursor: pointer;
  }

  .frame {
    position: absolute;
    z-index: 1;
    display: block;
    pointer-events: none;
    top: -15px;
    bottom: -15px;
    left: -15px;
    right: -15px;
    //border: solid pink 1px;
  }
}

.line {
  height: @grid-size / 10;
}

.square {
  float: left;
  // 1 px subtracted from width to account for 1px border
  width: 9% - 1px;
  border: 1px solid black;
  height: 100%;
  //background-color: white;

  // From https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */

  &.boat {
    background-color: lightblue;
  }

  &.hit {
    background-color: lightcoral;
  }

  &.miss {
    background-color: lightgray;
    content: '•';
  }

  &.destroyed {
    background-color: darkred;
  }
}

.columnLabels {
  float: left;
  width: 9% - 0.5px;
  text-align: center;
  //border: solid black 0.1px;
  padding-top: 10px;

}

.rowLabels {
  float: left;
  // 1 px subtracted from width to account for 1px border
  width: 9% - 0.5px;
  height: 50%;
  text-align: center;
  vertical-align: middle;
}

.boardLabel {
  text-align: center;
  font-weight: bold;
  font-stretch: semi-expanded;
  font-family: "Lucida Grande", monospace;
  color: darkcyan;
  margin: -20px;

}

</style>
