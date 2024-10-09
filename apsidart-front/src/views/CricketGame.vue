<script setup lang="ts">
import { ref } from 'vue';
import CricketBoard from '@/components/CricketBoard.vue';
import CricketPlayer from '@/components/CricketPlayer.vue';

const players = ref(['Kant1','Mati', 'ROM1', 'PHILO', 'ZIM']);
</script>

<template>
    <div class="title">CRICKET</div>
    <div class="points-recap">
        <div class="doors">
            <div class="door">20</div>
            <div class="door">19</div>
            <div class="door">18</div>
            <div class="door">17</div>
            <div class="door">16</div>
            <div class="door">15</div>
            <div class="door">25</div>
        </div>
    </div>
    <div class="players-container">
        <div class="players-content">
                <CricketPlayer
                    v-for="player in players"
                    :player="player"
                    :bg-color="(players.indexOf(player) % (players.length - 1))"
                    :is-top-bg-active="players.indexOf(player) !== 0"
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

.points-recap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 390px;
    margin-bottom: 1rem;
    
    .doors {
        display: flex;
        gap: .5rem;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;

        .door {
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

    .players-content {
        display: flex;
        flex-direction: column;
        max-width: 390px;
        width: 100%;
    }
}
</style>