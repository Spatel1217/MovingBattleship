<template>
  <div class="columnLabel" v-for="n in 10" :key="n">
    <!--          {{labelRows(c)}}-->
    O
  </div>
</template>

<script>
export default {
name: "ColumnLabel",
}
</script>

<style scoped>
.columnLabel{
  position:relative;
}
</style>