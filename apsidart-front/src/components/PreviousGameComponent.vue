<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameResume from './GameResume.vue';
import games from "../assets/mock/games.json";

const previousGames = ref([] as Array<GameResume>);

onMounted(() => {
    previousGames.value = games;
})

</script>

<template>
    <div class="previous-game-container">
        <div class="header">
            <h2>Vos parties</h2>
            <select name="mode-type-game" id="mode-type-game">
                <option value="501">501</option>
                <option value="301">301</option>
                <option value="cricket">Cricket</option>
            </select>
        </div>

        <div class="previous-game-content">

            <GameResume
                v-for="game in previousGames"
                :game="game"
            />

            <div class="see-more">
                voir plus
            </div>

        </div>
    </div>
</template>

<style lang="scss">

.previous-game-container {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 2px rgba(0,0,0,0.5);
    padding: 1rem;

    .header {
        display: flex;
        justify-content: space-between;

        h2 {
            font-family: "Bungee Tint", sans-serif;
            margin: 0;
        }

        select {
            border: none;
            outline: none;
            background-color: transparent;
        }
    }

    .previous-game-content {
        display: flex;
    }
}
</style>