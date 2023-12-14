<template>
  <v-row>
    <v-col>
      <h1>Planet list</h1>
    </v-col>
  </v-row>

  <v-row class="justify-space-between mb-5">
    <v-col md="4">
      <SearchBar @search="handleSearch" />
    </v-col>
    <v-col md="4">
      <SortBy v-model="sortBy" :items="['name', 'population', 'rotation_period', 'climate', 'gravity', 'created']" />
    </v-col>
  </v-row>

  <v-row v-if="!isFetching">
    <v-col v-for="planet in displayedPlanets" :key="planet.url" cols="12" md="6" lg="4">
      <PlanetItem :planet="planet" />
    </v-col>
  </v-row>

  <v-row v-else>
    <v-col class="text-center">
      <v-progress-circular indeterminate color="teal" />
    </v-col>
  </v-row>

  <v-row v-if="displayedPlanets.length === 10 && !isFetching">
    <v-col>
      <v-pagination
          color="teal"
          class="mt-6 mx-auto"
          :length="paginationCount"
          :total-visible="4"
          v-model="currentPage"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch, computed } from 'vue';
import handleSort from "@/utils/sort-by-field";

import PlanetItem from '@/components/PlanetItem'
import SearchBar from '@/components/SearchBar';
import SortBy from '@/components/SortBy'

const currentPage = ref(1);
const displayedPlanets = ref([]);
const isFetching = ref(false);
const planetList = ref([]);
const sortBy = ref('');

const paginationItemsPerPage = 10;

const paginationCount = computed(() => {
  return Math.ceil(planetList.value.count / paginationItemsPerPage);
});

const handleSearch = (searchPhrase) => {
  if (searchPhrase.length !== 0) {
    const lowerCasedPhrase = searchPhrase.toLowerCase();

    displayedPlanets.value = planetList.value?.results?.filter(planet => {
      const pName = planet.name?.toLowerCase();
      return pName.includes(lowerCasedPhrase);
    });
  } else {
    displayedPlanets.value = planetList.value.results;
  }
};

const fetchPlanets = (page = 1) => {
  isFetching.value = true;
  axios.get('https://swapi.dev/api/planets', {
    params: {
      page
    }
  })
      .then(response => {
        planetList.value = response.data;
        displayedPlanets.value = response.data.results;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        isFetching.value = false;
      });
};


watch(currentPage, (newVal, oldVal) => {
  newVal !== oldVal && fetchPlanets(newVal)
  sortBy.value = ''
});
watch(sortBy, () => handleSort(sortBy.value, displayedPlanets.value));

onMounted(() => {
  fetchPlanets();
});
</script>

