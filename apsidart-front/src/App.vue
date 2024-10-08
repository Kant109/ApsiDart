<template>

  <WaitingPage v-if="!isAppLoaded" />
  <RouterView v-else />

  <NavigationBar v-if="router.currentRoute.value.name !== 'cricket' && isAppLoaded"/>
  
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useManagementAppStore } from './stores/ManagementAppStore';
import WaitingPage from './views/WaitingPage.vue';
import { RouterView, useRouter } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';

const router = useRouter();

const managementAppStore = useManagementAppStore();

const isAppLoaded = computed(() => managementAppStore.isAppLoaded);

onMounted(() => {
  // GET profil
  setTimeout(() => {
    managementAppStore.isAppLoaded = true;
  }, 2500)
})

</script>

<style lang="scss">
#app {
  background-color: #0a1e30;
}
</style>
