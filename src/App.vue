<template>
  <v-app>
    <v-main>
      <git-hub />
      <grid />
    </v-main>
  </v-app>
</template>

<script>
import Grid from "./components/Grid";
import GitHub from "./components/GitHub";

export default {
  name: "App",

  components: {
    Grid,
    GitHub
  },

  data: () => ({
    //
  })
};
</script>
<style>
#app {
  background: #232222;
}
</style>

/**
app background
card theme
on hover card
 */