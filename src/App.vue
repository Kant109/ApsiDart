<template>

  <WaitingPage v-if="!isAppLoaded" />
  <RouterView v-else />

  <NavigationBar v-if="showNavBar()"/>
  
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useManagementAppStore } from './stores/ManagementAppStore';
import WaitingPage from './views/WaitingPage.vue';
import { RouterView, useRouter } from 'vue-router';
import NavigationBar from './components/NavigationBar.vue';
import { useCricketGameStore } from './stores/CricketGameStore';
import { useX01GameStore } from './stores/X01GameStore';

const router = useRouter();

const managementAppStore = useManagementAppStore();
const cricketGameStore = useCricketGameStore();
const x01GameStore = useX01GameStore();

const isAppLoaded = computed(() => managementAppStore.isAppLoaded);

const showNavBar = () => {
    return router.currentRoute.value.name !== 'cricket' && router.currentRoute.value.name !== 'x01' && isAppLoaded.value;
}

const Kant1: CricketPlayer = {
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

const Mati: CricketPlayer = {
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

const Rom1: CricketPlayer = {
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

const Phil: CricketPlayer = {
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

const Zim: CricketPlayer = {
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

const Bast1: CricketPlayer = {
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

const Kant1X01: X01Player = {
    "id": "1",
    "pseudo": "Kant1",
    "isActive": true,
    "points": 301,
    "volleys": [['', '', '']]
}

const MatiX01: X01Player = {
    "id": "1",
    "pseudo": "Mati",
    "isActive": false,
    "points": 301,
    "volleys": []
}

onMounted(() => {
  cricketGameStore.setPlayer(Kant1);
  cricketGameStore.setPlayer(Mati);
  cricketGameStore.setPlayer(Rom1);
  cricketGameStore.setPlayer(Phil);
  cricketGameStore.setPlayer(Zim);
  cricketGameStore.setPlayer(Bast1);

  x01GameStore.setPlayer(Kant1X01);
  x01GameStore.setPlayer(MatiX01);
  
  // GET profil
  setTimeout(() => {
    managementAppStore.isAppLoaded = true;
  }, 2500)
})

</script>

<style lang="scss">
@import "@/assets/helpers/variables.scss";

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $dark-mode-primary;
}
</style>
