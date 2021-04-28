<template>
  <Title/>
  <Instructions/>
  <Grid />
  <CommandBox />
</template>

<script>
import CommandBox from "./components/CommandBox";
import Grid from "./components/Grid";
import Title from "./components/Title";
import Instructions from "./components/Instructions";

export default {
  name: "App",

  components: {
    Instructions,
    Title,
    CommandBox,
    Grid,
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

</style>
