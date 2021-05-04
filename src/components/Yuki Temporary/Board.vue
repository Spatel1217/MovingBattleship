<template>
  <header v-if="calculateWinner" class="header">
    <h1>
      {{ calculateWinner }}
    </h1>
  </header>
  <h1 v-else>Next Up: {{ playerValue }}</h1>
  <span ref="boardRef" class="confetti-origin"></span>

  <div class="board">
    <span class="vertical-line-1"></span>
    <span class="vertical-line-2"></span>
    <Square
        v-for="(square, i) in board"
        :key="`square-${i}`"
        :label="`square-${i}`"
        :value="square"
        @click="markSquare(i)"
    />
  </div>
</template>

<script>
import Square from "./Square.vue"
import { ref, computed } from 'vue'
export default {
  name: "Board",
  components: {
    Square,
  },
  setup() {
    const board = ref(Array(9).fill(null));
    const playerValue = ref('X');

    const markSquare = (i) => {
      const boardCopy = board.value.slice();
      boardCopy[i] = playerValue.value;
      board.value = boardCopy;
      playerValue.value === 'X' ? (playerValue.value = 'O') : (playerValue.value = 'X');
    };

    const calculateWinner = computed(() => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            board.value[a] &&
            board.value[a] === board.value[b] &&
            board.value[a] === board.value[c]
        ) {
          return `${board.value[a]} Wins`;
        }
      }

      if (board.value.every((val) => val)) return "Tie!";

      return null;
    });

    return {
      board,
      playerValue,
      markSquare,
      calculateWinner
    }
  }
};

</script>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.board::before,
.board::after {
  background: linear-gradient(to right, #41b883, #35495e);
}

.vertical-line-1,
.vertical-line-2 {
  background: linear-gradient(to right, #41b883, #35495e);
}

.board::before,
.board::after {
  content: "";
  width: 100%;
  height: 5px;
  position: absolute;
  border-radius: 1rem;
}

.board::before {
  top: 33%;
}

.board::after {
  top: 66%;
}

.vertical-line-1,
.vertical-line-2 {
  position: absolute;
  width: 100%;
  height: 5px;
  top: 50%;
  border-radius: 1rem;
  transform: translate(-50%, -50%) rotate(90deg);
}

.vertical-line-1 {
  left: 33%;
}

.vertical-line-2 {
  left: 66%;
}
</style>