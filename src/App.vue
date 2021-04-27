<template>
  <Title/>
  <Grid />
  <CommandBox />
</template>

<script>
import CommandBox from "./components/CommandBox";
import Grid from "./components/Grid";
import Title from "./components/Title";

export default {
  name: "App",

  components: {
    CommandBox,
    Grid,
    Title,
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
