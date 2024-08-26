<script setup lang="ts">

defineProps<{
    game: GameResume
}>();

</script>

<template>

    <div class="game-resume-container">
        <div class="rank">{{ game.position }}</div>
        <div class="score">{{ game.score }}</div>
        <div class="date">{{ game.date }}</div>
    </div>

</template>

<style lang="scss">

.game-resume-container {
    display: flex;
    margin: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 2px rgba(0,0,0,0.5);
    padding: 1rem;
}
</style>