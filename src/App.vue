<template>
  <v-app>
    <v-container>
      <PlanetList class="planet-list" />
    </v-container>
  </v-app>
</template>

<script setup>
import PlanetList from './components/PlanetList'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
