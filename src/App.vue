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
import { useGameStore } from './stores/GameStore';

const router = useRouter();

const managementAppStore = useManagementAppStore();
const gameStore = useGameStore();

const isAppLoaded = computed(() => managementAppStore.isAppLoaded);

const Kant1: Player = {
    "id": "1",
    "pseudo": "Kant1",
    "isActive": true,
    "points": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0,
        "total": 0
    },
    "doors": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0
    },
    "volleys": [['', '', '']]
};

const Mati: Player = {
    "id": "2",
    "pseudo": "Mati",
    "isActive": false,
    "points": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0,
        "total": 0
    },
    "doors": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0
    },
    "volleys": []
};

const Rom1: Player = {
    "id": "3",
    "pseudo": "Rom1",
    "isActive": false,
    "points": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0,
        "total": 0
    },
    "doors": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0
    },
    "volleys": []
};

const Phil: Player = {
    "id": "4",
    "pseudo": "Phil",
    "isActive": false,
    "points": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0,
        "total": 0
    },
    "doors": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0
    },
    "volleys": []
};

const Zim: Player = {
    "id": "5",
    "pseudo": "Zim",
    "isActive": false,
    "points": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0,
        "total": 0
    },
    "doors": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0
    },
    "volleys": []
};

const Bast1: Player = {
    "id": "6",
    "pseudo": "Bast1",
    "isActive": false,
    "points": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0,
        "total": 0
    },
    "doors": {
        "20": 0,
        "19": 0,
        "18": 0,
        "17": 0,
        "16": 0,
        "15": 0,
        "25": 0
    },
    "volleys": []
};

onMounted(() => {
  gameStore.setPlayer(Kant1);
  gameStore.setPlayer(Mati);
  gameStore.setPlayer(Rom1);
  gameStore.setPlayer(Phil);
  gameStore.setPlayer(Zim);
  gameStore.setPlayer(Bast1);
  // GET profil
  setTimeout(() => {
    managementAppStore.isAppLoaded = true;
  }, 2500)
})

</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0a1e30;
}
</style>
