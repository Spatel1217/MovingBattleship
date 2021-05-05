<template>
  <Title/>
  <Instructions/>
  <div class="gridContainer">
    <Grid />
    <EnemyGrid/>
  </div>
<!--  <EnemyGrid/>-->
<!--  <Grid />-->

  <CommandBox />
</template>

<script>
import CommandBox from "./components/CommandBox";
import Grid from "./components/Grid";
import Title from "./components/Title";
import Instructions from "./components/Instructions";
import EnemyGrid from "./components/EnemyGrid";

export default {
  name: "App",

  components: {
    Instructions,
    Title,
    CommandBox,
    Grid,
    EnemyGrid,
  },
  data: function() {
    return {
      display: this.onResize()
    };
  },
  methods: {
    onResize() {
      this.display = (window.innerWidth > 1100);
    }
  },
  created() {
    window.addEventListener("resize", this.onResize);
  }
}
</script>

<style>

.gridContainer{
  display:grid;
  width: 840px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-left: 10%;
  /*border: solid blue 1px;*/
}
</style>
