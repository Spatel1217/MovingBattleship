Toggling Button adapted from "https://paulund.co.uk/vuejs-conditional-show-and-hide"

<template>
  <div class="instruction">
    <p>
      <button class="button" v-on:click="seen = !seen">?</button>
    </p>
    <div class="instructionsText">
      <div v-if="seen">
        <b style="font-size:30px; font-family: fantasy"> How to Play: </b>
        <p> Objective: Find and sink all of the opponent's ships before they do to win! </p>
        <p> Unlike regular Battleship, there are no turns! Shoot as fast as you can!</p>
        <p> Type commands into the Command Box to make your moves. Type "Fire", followed by a Letter and a Number to
          indicate where to fire.</p>
        <p> Example: 'Fire A2', 'fire g4'</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  data: function () {
    return {
      seen: true
    };
  }
}
</script>

<style scoped>
.instruction {
  width: 20%;
  height: 40%;
  position: absolute;
  z-index: 1;
}

.instructionsText {
  width: 70%;
  height: 50%;
}

.button {
  color: red;
  font-family: monospace;
  font-weight: bolder;
  font-size: 40px;
}
</style>