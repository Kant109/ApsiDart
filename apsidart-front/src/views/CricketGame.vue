<script setup lang="ts">
import { computed } from 'vue';
import CricketBoard from '@/components/CricketBoard.vue';
import CricketPlayer from '@/components/CricketPlayer.vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

const players = computed(() => gameStore.players);
</script>

<template>
    <div class="title">CRICKET</div>
    <div class="points-recap-doors">
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
    <div class="players-container">
        <div class="players-content">
                <CricketPlayer
                    v-for="player in players"
                    :player="player"
                    :is-top-bg-active="players.indexOf(player) !== 0"
                    :is-top-bg-player-active="players[players.indexOf(player) - 1 > 0 ? players.indexOf(player) - 1 : 0].isActive === true"
                />
        </div>
    </div>
    <CricketBoard />
</template>

<style lang="scss">
.title {
    display: flex;
    justify-content: center;
    font-family: "Monoton", sans-serif;
    font-size: 3.25rem;
    padding: 2rem;
    color: #F0F2EF;
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
            background-color: #F0F2EF;
            width: 1.5rem;
            aspect-ratio: 1/1;
        }
    }
}

.players-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: 200px;
    background-color: #0a1e30;

    .players-content {
        display: flex;
        flex-direction: column;
        max-width: 390px;
        width: 100%;
    }
}
</style>