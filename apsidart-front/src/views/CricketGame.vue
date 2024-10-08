<script setup lang="ts">
import { ref } from 'vue';
import CricketBoard from '@/components/CricketBoard.vue';
import CricketPlayer from '@/components/CricketPlayer.vue';

const players = ref(['Kant1','Mati', 'ROM1']);
</script>

<template>
    <div class="title">CRICKET</div>
    <div class="players">
        <CricketPlayer v-for="player in players" :player="player"/>
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
</style>