<template>
  <div class="title">
    <hd>BATTLESHIP</hd>
  </div>
</template>

<script>
export default {
name: "Title"
}
</script>

<style scoped>
.title {
  position: absolute;
  text-align: center;
  margin-right: 30%;
  margin-left: 30%;
  font-size: 80px;
  color: orange;
  font-family: "Copperplate", fantasy;

 /*From https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting*/
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}


</style>