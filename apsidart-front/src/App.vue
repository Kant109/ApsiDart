<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useGestionsAppStore } from './stores/GestionsAppStore';
import WaitingScreen from './views/WaitingScreen.vue';
import { RouterView } from 'vue-router';

const gestionsAppStore = useGestionsAppStore();

const isAppLoaded = computed(() => gestionsAppStore.isAppLoaded);

onMounted(() => {
  // GET profil
  setTimeout(() => {
    gestionsAppStore.isAppLoaded = true;
  }, 2500)
})

</script>

<template>

  <WaitingScreen v-if="!isAppLoaded" />
  <RouterView v-else />
  
</template>
