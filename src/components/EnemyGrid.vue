<template>
  <div class="canvas">
    <div class="frame"></div>
    <div class="line" style="margin:-10px">
      <p class="boardLabel">
        {{ board2Label }}
      </p>
    </div>
    <div class="line">
      <div class="columnLabels"></div>
      <div class="columnLabels" v-for="j in 10" :key="j">
        {{ labelRows(j) }}
      </div>
    </div>
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
            boat: enemyMap[m - 1][n - 1] === 'boat',
            hit: enemyMap[m - 1][n - 1] === 'hit',
            miss: enemyMap[m - 1][n - 1] === 'miss',
            destroyed: enemyMap[m - 1][n - 1] === 'destroyed',
          }"
      >
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "EnemyGrid",
  data() {
    return {
      enemyMap: Array.from({length: 10}, () =>
          Array.from({length: 10}, () => '')
      ),
      board2Label: 'Enemy Board',
    }
  },
  methods: {
    resetBoard() {
      this.enemyMap = Array.from({length: 10}, () =>
          Array.from({length: 10}, () => false))
    },
    onResize() {
      var target = {x: 300, y: 215, width: 475, height: 475};
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
    setupListeners() {
      this.emitter.on('enemy-map-update', (enemyBoard) => {
        this.enemyMap = enemyBoard
        // this.addSquareText()
      })

      this.emitter.on('logoff', () => {
        this.resetBoard();
      })

      this.emitter.on('player-number', playerNumber => {
        if(playerNumber === 0) {
          this.board2Label = 'P2 Board'
        } else {
          this.board2Label = 'Enemy Board'
        }
      })
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize)
    window.dispatchEvent(new Event("resize"))
    this.setupListeners()
  }
}
</script>

<style scoped lang="less">
@grid-size: 420px;

* {
  font-family: "Lucida Grande", monospace;
}

.canvas {
  //transform: rotate(-6deg);
  position: relative;
  //flex:1;
  //float: right;
  //border: 1px solid red;
  &:hover {
    cursor: pointer;
  }

  .frame {
    position: absolute;
    display: block;
    pointer-events: none;
    top: -15px;
    bottom: -15px;
    left: -15px;
    right: -15px;
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
  background-color: white;

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

  /*From https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.rowLabels {
  float: left;
  // 1 px subtracted from width to account for 1px border
  width: 9% - 0.5px;
  height: 50%;
  text-align: center;
  padding-top: 2.75%;
  vertical-align: middle;

  /*From https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.boardLabel {
  text-align: center;
  font-weight: bold;
  font-stretch: semi-expanded;
  color: firebrick;
  margin: -20px;

  /*From https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

</style>
