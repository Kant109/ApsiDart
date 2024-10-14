<template>
    <div class="nav-bar">
        <div class="stats" @click.prevent="goToStats"><img src="../assets/images/stats.svg" alt="stats"></div>
        <div class="game" @click.prevent="goToGame"><img src="../assets/images/target.svg" alt="target"></div>
        <div class="profile" @click.prevent="goToProfile"><img src="../assets/images/profile.svg" alt="profile"></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToStats = () => {
    router.push({ name: "stats"});
}

const goToGame = () => {
    router.push({ name: "cricket"});
}

const goToProfile = () => {
    router.push({ name: "profile"});
}
</script>

<style lang="scss">

.nav-bar {
    display: flex;
    justify-content: space-evenly;
    background-color: white;
    border-radius: 2rem 2rem 0 0;
    padding: .5rem 0;
    position: fixed;
    bottom: 0;
    width: 100vw;

    .stats, .game, .profile {
        img {
            min-width: 2.5rem;
            min-height: 2.5rem;
        }
    }
}

</style>
