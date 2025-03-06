<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

const selectedSport = ref("");
const players = ref([] as Array<PlayerRanking>);

const getRanking = async (sport: string) => {
    const url = import.meta.env.VITE_BE_URL + "/" + sport + "/stat/player/ranking";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        players.value = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
}

onBeforeMount(() => {
    selectedSport.value = localStorage.getItem('sports-ranking-denis') !== null ? localStorage.getItem('sports-ranking-denis') as string : 'dart';
})

watch(
    () => selectedSport.value,
    () => getRanking(selectedSport.value)
)

</script>

<template>
    <div class="ranking-container">
        <div class="header">
            <h2>Classement</h2>

            <div class="select-sport">
                <label for="sport-select">Choisis un sport:</label>
                
                <select name="sport" id="sport-select" v-model="selectedSport">
                    <option value="dart" :selected="selectedSport === 'dart'">Fléchettes</option>
                    <option value="babyfoot" :selected="selectedSport === 'babyfoot'">Babyfoot</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.ranking-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0;

        .select-sport {
            display: flex;
            flex-direction: column;
        }
    }
}

</style>