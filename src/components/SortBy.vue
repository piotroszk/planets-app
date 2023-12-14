<template>
  <v-select
      density="compact"
      hide-details="auto"
      label="Sort by"
      :items="props.items"
      :value="props.sortBy"
      @change="$emit('update:sortBy', $event.target.value)"
  ></v-select>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['sortBy', 'items']);
</script>
