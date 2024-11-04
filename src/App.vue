<template>
    <main :class="{'darkmode': isDarkMode}">
        <WaitingPage v-if="!isAppLoaded" />
        <RouterView v-else />
    </main>
  
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted } from 'vue';
import { useManagementAppStore } from './stores/ManagementAppStore';
import WaitingPage from './views/WaitingPage.vue';
import { RouterView } from 'vue-router';
import { useCricketGameStore } from './stores/CricketGameStore';
import { useX01GameStore } from './stores/X01GameStore';

const managementAppStore = useManagementAppStore();
const cricketGameStore = useCricketGameStore();
const x01GameStore = useX01GameStore();

const isAppLoaded = computed(() => managementAppStore.isAppLoaded);
const isDarkMode = computed(() => managementAppStore.isDarkMode);

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

onBeforeMount(() => {
    managementAppStore.isDarkMode = localStorage.getItem('darkmode-apsidart') === 'active';
})

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

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
    background-color: var(--bg-color-primary);

    &.darkmode {
        --bg-color-primary: #121212;
        --bg-color-secondary: #3f3f3f;
        --button-primary: #ffe8b9;
        --text-color: white;
        --cricket-door-disable: rgba(255, 255, 255, 0.1);
    }
}
</style>
