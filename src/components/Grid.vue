// Adapted from Ahoy src/components/Placement/Map.vue

<template>
  <div class="canvas">
    <div class="frame"></div>
    <div class="line" v-for="n in 10" :key="n">
      <div
          class="square"
          :data-y="n"
          :data-x="m"
          v-for="m in 10"
          :key="m"
          @click="clickSquare"
          v-bind:class="{
            // hovered: playerMap.hoverMap[n - 1][m - 1],
            // placed: playerMap.boatMap[n - 1][m - 1],
            // koClick: !playerMap.okClick
          }"
      >
        <span> {{ value }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {ref} from 'vue'

export default {
  data() {
    const mark = ref("");

    return {
      currentCommand: '',
      previousCommands: [],
      inputError: '',
      mark,

      nested: {
        mark
      }
    }
  },
  methods: {
    clickSquare: function (event) {
      // alert("Clicked (" + event.target.dataset.x + ", " + event.target.dataset.y + ")")
      event.target.innerHTML = "X"
      event.target.style.backgroundColor = "lightblue"
      // this.setValue(event);
    },
    // setValue: function (event) {
    //
    // },
    onResize() {
      var target = {x: 500, y: 215, width: 475, height: 475};
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
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.dispatchEvent(new Event("resize"));
    const io = require("socket.io-client");
    console.log('connecting...');
    const socket = io.connect("http://localhost:3000");

    //Example move send to server
    socket.emit('actuate', { command: 'a5' });

    //Listen for server-given player number
    socket.on('player-number', (playerNumber) => {
      if(playerNumber == 1) {
        console.log('Connected P1');
      } else if(playerNumber == 2) {
        console.log('Connected P2');
      }
    });

    //listen for server broadcasted moves
    socket.on('move', (move) => {
      console.log('P' + move.playerIndex + ': ' + move.command);
    });
  }
}
</script>

<style scoped lang="less">
@grid-size: 420px;

.canvas {
  //transform: rotate(-6deg);
  position: relative;
  //border: 1px solid black;
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
  width: 10% - 1px;
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

  &.hit {

  }
}
</style>
