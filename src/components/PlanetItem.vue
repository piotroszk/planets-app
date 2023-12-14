<template>
  <div class="planet-item">
    <p class="d-flex ga-2" v-for="(value, key) in planetScheme" :key="key">
      <strong>{{ key.toUpperCase() }}</strong>
      <span>{{ key === 'created' ? dateFormatter(value) : value }}</span>
    </p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import dateFormatter from "@/utils/date-formatter";

const props = defineProps(['planet']);

const planetScheme = computed(() => {
  const { name, population, rotation_period, climate, gravity, created, url } = props.planet;
  return { name, population, rotation_period, climate, gravity, created, url };
})

</script>

<style lang="scss" scoped>
.planet-item {
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  border: 1px solid #006270;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 4px 4px 24px 0 rgba(0, 147, 148, 1);
}
</style>
