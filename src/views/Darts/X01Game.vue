<script setup lang="ts">
import { computed } from 'vue';
import X01Board from '@/components/X01/X01Board.vue';
import X01Player from '@/components/X01/X01Player.vue';
import { useX01GameStore } from '@/stores/X01GameStore';

const gameStore = useX01GameStore();

const players = computed(() => gameStore.players);
const isGameFinish = computed(() => gameStore.isGameFinish);
const isGameWinner = computed(() => gameStore.isGameWinner);

</script>

<template>
    <div class="title">301</div>
    <div class="players-container" v-if="!isGameFinish">
        <div class="players-content">
                <X01Player
                    v-for="player in players"
                    :player="player"
                    :is-top-bg-active="players.indexOf(player) !== 0"
                    :is-top-bg-player-active="players[players.indexOf(player) - 1 > 0 ? players.indexOf(player) - 1 : 0].isActive === true"
                />
        </div>
    </div>
    <X01Board v-if="!isGameFinish"/>
    <div v-if="isGameFinish">
        GAME IS FINISH
        {{ isGameWinner.pseudo }}
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/variables.scss";

.title {
    display: flex;
    justify-content: center;
    font-family: "Monoton", sans-serif;
    font-size: 2.5rem;
    padding: 2rem 2rem 1rem 2rem;
    color: $light-mode-primary;
}

.points-recap-doors {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 390px;
    margin-bottom: 1rem;
    
    .recap-doors {
        display: flex;
        gap: .5rem;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;

        .recap-door {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background-color: $light-mode-primary;
            width: 1.5rem;
            aspect-ratio: 1/1;
        }
    }
}

.players-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100% - 287px);
    background-color: $dark-mode-primary;
    overflow: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    .players-content {
        display: flex;
        flex-direction: column;
        max-width: 390px;
        width: 100%;

        &::after {
            content: "";
            height: .75rem;
            border-radius: 0 0 1rem 1rem;
            --tw-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, .25);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            background-color: $light-mode-primary;
        }
    }
}
</style>