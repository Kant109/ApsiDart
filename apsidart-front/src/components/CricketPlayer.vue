<script setup lang="ts">
defineProps<{
  player?: string
}>()
</script>

<template>
    <div class="player-content">
        <div class="player-name">{{ player }}</div>
        <div class="doors">
            <div class="door"></div>
            <div class="door"></div>
            <div class="door"></div>
            <div class="door"></div>
            <div class="door"></div>
            <div class="door"></div>
            <div class="door"></div>
        </div>
        <div class="points-taken">540</div>
    </div>
</template>

<style lang="scss">
.player-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 60px;

    .player-name, .points-taken {
        display: flex;
        align-items: center;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;
        color: rgba(black, .75);

        &:is(.player-name) {
            min-width: 55px;
            grid-area: 1 / 1 / 2 / 2;
        }

        &:is(.points-taken) {
            justify-content: flex-end;
            grid-area: 1 / 5 / 2 / 6;
        }
    }

    .doors {
        display: flex;
        align-items: center;
        gap: .5rem;
        grid-area: 1 / 2 / 2 / 5;

        .door {
            border: 2px solid black;
            border-radius: 50%;
            height: 1.5rem;
            width: 1.5rem;
        }
    }
}
</style>