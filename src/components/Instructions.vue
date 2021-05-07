Toggling Button adapted from "https://paulund.co.uk/vuejs-conditional-show-and-hide"

<template>
  <div class="instruction">
    <p><button class="button" v-on:click="seen = !seen">i</button></p>
    <div class="instructionsText">
      <div v-if="seen">
        <b style="font-size:30px"> How to Play: </b>
        <p> Objective: Find and sink all of the opponent's ships before they do to win! </p>
        <p> Type commands into the Command Box to make your moves. Type "Fire", followed by a Letter and a Number to indicate where to fire.</p>
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
.instruction{
  width: 20%;
  height: 40%;
  position: absolute;
  z-index: 1;
}

.instructionsText{
  width: 70%;
  height: 50%;
}
</style>