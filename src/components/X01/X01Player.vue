<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  player: X01Player
  isTopBgActive: boolean
  isTopBgPlayerActive: boolean
}>()

const isStatOpen = ref(false);

const openStat = () => {
    isStatOpen.value = !isStatOpen.value;
}

</script>

<template>
    <div class="full-content" :class="{'top-bg': props.isTopBgActive, 'top-bg-active': props.isTopBgPlayerActive && props.isTopBgActive}">
        <div class="player-content" :class="{'isPlayerActive': player.isActive }" @click.prevent="openStat">
            <div class="player-name">{{ player.pseudo }}</div>
                <div class="recap">
                    <div class="current-points">
                    <div class="points">{{ player.volleys.length > 0 ? player.volleys[player.volleys.length - 1][0] : "" }}</div>
                    <div class="points">{{ player.volleys.length > 0 ? player.volleys[player.volleys.length - 1][1] : "" }}</div>
                    <div class="points">{{ player.volleys.length > 0 ? player.volleys[player.volleys.length - 1][2] : "" }}</div>
                </div>
            </div>
            <div class="points-taken">{{ player.points }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/variables.scss";

.top-bg {
    background-color: $light-mode-primary;
}

.top-bg-active {
    background-color: $active-player;
}

.player-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 60px;
    background-color: $light-mode-primary;
    border-radius: 1rem 1rem 0 0;
    padding: 0 1rem;
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    &.isPlayerActive {
        background-color: $active-player;
    }

    .player-name, .points-taken {
        display: flex;
        align-items: center;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;
        color: black;

        &:is(.player-name) {
            min-width: 55px;
            grid-area: 1 / 1 / 2 / 2;
        }

        &:is(.points-taken) {
            justify-content: flex-end;
            grid-area: 1 / 5 / 2 / 6;
        }
    }

    .recap {
        display: flex;
        justify-content: center;
        flex-direction: column;
        grid-area: 1 / 2 / 2 / 5;
        gap: .5rem;
        padding-top: 5px;

        .current-points {
            display: flex;
            justify-content: center;
            gap: 2rem;

            .points {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: "Tilt Warp", sans-serif;
                font-size: 1rem;
                padding-bottom: 5px;
                border-radius: 8px;
                width: 2.5rem;
                aspect-ratio: 1/1;
                background-color: white;
                border: 1px solid rgba(0, 0, 0, .25);
                --tw-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, .25);
                box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            }
        }
    }
}

@media screen and (max-width: 389px) {
    .player-content {
        .recap {
            .doors {
                gap: .3rem;
                .door {
                    width: 1.3rem;
                    height: 1.3rem;
                }
            }
        }
    }
}
</style>