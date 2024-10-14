<template>
    <div class="nav-bar">
        <div class="stats" @click.prevent="goToStats"><img src="../assets/images/stats.svg" alt="stats"></div>
        <div class="game" @click.prevent="goToGame"><img src="../assets/images/target.png" alt="target"></div>
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
    padding: 13px 0 1rem 0;
    position: fixed;
    bottom: 0;
    width: 100vw;
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    --tw-shadow-colored: inset 0 -5px 0 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow);

    .stats, .game, .profile {
        img {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
}

</style>
