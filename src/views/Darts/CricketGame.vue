<script setup lang="ts">
import { computed, ref } from 'vue';
import CricketBoard from '@/components/Cricket/CricketBoard.vue';
import CricketPlayer from '@/components/Cricket/CricketPlayer.vue';
import { useCricketGameStore } from '@/stores/CricketGameStore';

const gameStore = useCricketGameStore();

const players = computed(() => gameStore.players);
const isGameFinish = computed(() => gameStore.isGameFinish);
const isGameWinner = computed(() => gameStore.isGameWinner);
const isLastPlayerActive = ref(false);

const setIsLastPlayerActive = (isCurrentPlayerLast: boolean) => {
    console.log('in emit')
    isLastPlayerActive.value = isCurrentPlayerLast;
}

</script>

<template>
    <div class="title">CRICKET</div>
    <div class="points-recap-doors" v-if="!isGameFinish">
        <div class="recap-doors">
            <div class="recap-door">20</div>
            <div class="recap-door">19</div>
            <div class="recap-door">18</div>
            <div class="recap-door">17</div>
            <div class="recap-door">16</div>
            <div class="recap-door">15</div>
            <div class="recap-door">25</div>
        </div>
    </div>
    <div class="players-container" v-if="!isGameFinish">
        <div class="players-content" :class="{'lastPlayerActive': isLastPlayerActive}">
                <CricketPlayer
                    v-for="player in players"
                    :player="player"
                    :is-top-bg-active="players.indexOf(player) !== 0"
                    :is-top-bg-player-active="players[players.indexOf(player) - 1 > 0 ? players.indexOf(player) - 1 : 0].isActive === true"
                    @isLastPlayer="setIsLastPlayerActive"
                />
        </div>
    </div>
    <CricketBoard v-if="!isGameFinish"/>
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
    color: white;
}

.points-recap-doors {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 390px;
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
            background-color: white;
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
    max-height: calc(100vh - 287px);
    height: 100%;
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
        
        &.lastPlayerActive {
            &::after {
                background-color: $active-player;
            }
        }
    }
}

@media screen and (max-width: 389px) {
    .players-container {
        max-height: calc(100vh - 278px);
    }
}
</style>