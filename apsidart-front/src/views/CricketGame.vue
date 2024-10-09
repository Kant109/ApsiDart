<script setup lang="ts">
import { ref } from 'vue';
import CricketBoard from '@/components/CricketBoard.vue';
import CricketPlayer from '@/components/CricketPlayer.vue';

const players = ref(['KKKKK','Mati', 'ROM1']);
</script>

<template>
    <div class="title">CRICKET</div>
    <div class="players-container">
        <div class="players-content">
            <CricketPlayer v-for="player in players" :player="player"/>
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

.players-container {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #F0F2EF;

    .players-content {
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        max-width: 390px;
        width: 100%;
    }
}
</style>