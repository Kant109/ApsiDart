<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useManagementAppStore } from './stores/ManagementAppStore';
import WaitingPage from './views/WaitingPage.vue';
import { RouterView } from 'vue-router';

const managementAppStore = useManagementAppStore();

const isAppLoaded = computed(() => managementAppStore.isAppLoaded);

onMounted(() => {
  // GET profil
  setTimeout(() => {
    managementAppStore.isAppLoaded = true;
  }, 2500)
})

</script>

<template>

  <WaitingPage v-if="!isAppLoaded" />
  <RouterView v-else />
  
</template>
