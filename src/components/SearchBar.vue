<template>
  <v-text-field
      v-model="searchText"
      density="compact"
      hide-details="auto"
      label="Search"
      append-inner-icon="mdi-magnify"
      @input="handleOnChange"
  ></v-text-field>
</template>

<script setup>
import { ref, defineEmits, onBeforeUnmount } from 'vue';

const searchText = ref('');
const emit = defineEmits(['search']);

let timerId = null;
const handleOnChange = () => {
  try {
    clearTimeout(timerId);
    timerId = setTimeout(async () => {
      emit('search', searchText.value);
    }, 500);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

onBeforeUnmount(() => {
  clearTimeout(timerId);
});
</script>
