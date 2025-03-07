<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';

const selectedSport = ref("");
const games = ref([] as Array<GameDetails>);

const router = useRouter();

const getGameDetails = async (sport: string) => {
    const url = import.meta.env.VITE_BE_URL + "/" + sport + "/game";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        games.value = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
}

const previousRoute = () => {
    router.push({ name:"home" });
}

onBeforeMount(() => {
    selectedSport.value = localStorage.getItem('game-details-denis') !== null ? localStorage.getItem('game-details-denis') as string : 'dart';
})

watch(
    () => selectedSport.value,
    () => getGameDetails(selectedSport.value)
)

</script>

<template>
    <div class="game-details-container">
        <Header
            title="Parties"
            @previous-route="previousRoute"
        />
        <div class="select-sport">
            <label for="sport-select">Choisis un sport:</label>
            
            <select name="sport" id="sport-select" v-model="selectedSport">
                <option value="dart" :selected="selectedSport === 'dart'">Fléchettes</option>
            </select>
        </div>
        <div class="game-details-content">
            <div class="game" v-for="game in games">
                Partie #{{ game.id }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.game-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--bg-color-primary);

    .select-sport {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 1rem;

        label {
            font-family: "Tilt Warp", sans-serif;
            font-size: 1rem;
            color: var(--text-color);
            margin-bottom: .5rem;
        }

        select {
            width: 100%;
            height: 2rem;
            border: 1px solid lightgray;
            font-family: "Tilt Warp", sans-serif;
            color: var(--text-color);
            border-radius: .5rem;
            text-align: center;

            option {
                font-family: "Tilt Warp", sans-serif;
                color: var(--text-color);
            }
        }
    }

    .game-details-content {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
        padding: 1rem;

        .game {
            display: grid;
            grid-template-columns: 10% 60% 30%;
            align-items: center;
            width: 100%;
            min-height: 3rem;
            position: relative;
            background-color: var(--bg-color-secondary);
            border-radius: 8px;
            cursor: pointer;
            font-family: "Playpen Sans", sans-serif;
            font-size: 1rem;
        }
    }
}
</style>