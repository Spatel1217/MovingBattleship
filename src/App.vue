<template>
  <div class="topBanner">
    <Instructions/>
    <Title/>
  </div>
  <div class="gridContainer">
    <Grid />
    <EnemyGrid/>
    <ConnectionStatus/>
  </div>
<!--  <EnemyGrid/>-->
<!--  <Grid />-->
<!--  <div class="boxBox">-->

<!--  </div>-->
  <CommandBox />
</template>

<script>
import CommandBox from "./components/CommandBox";
import Grid from "./components/Grid";
import Title from "./components/Title";
import Instructions from "./components/Instructions";
import EnemyGrid from "./components/EnemyGrid";
import ConnectionStatus from "./components/ConnectionStatus";

export default {
  name: "App",

  components: {
    Instructions,
    Title,
    CommandBox,
    Grid,
    EnemyGrid,
    ConnectionStatus,
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
.topBanner{
  display:grid;
  grid-template-columns: 1fr 4fr;
  width: 100%;
  height: 10%;
  /*border: solid red 1px;*/
}

.gridContainer{
  display:grid;
  width: 80%;
  height: 300px;
  /*height: 30%;*/
  grid-template-columns: 2fr 2fr 1fr;
  grid-gap: 10px;
  /*margin-left: 10%;*/
  /*border: solid blue 1px;*/
}


</style>
