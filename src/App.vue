<template>
  <Grid />
  <CommandBox />
</template>

<script>
import CommandBox from "./components/CommandBox";
import Grid from "./components/Grid";

export default {
  name: "App",

  components: {
    CommandBox,
    Grid
  },
  data: function() {
    return {
      display: this.onResize()
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth > 1100) {
        this.display = false;
      } else {
        this.display = true;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.onResize);
  }
}
</script>

<style>

</style>
