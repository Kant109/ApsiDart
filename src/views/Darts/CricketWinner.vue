<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue";
import ConfettiAnimation from "../../assets/animations/confetti.json";
import { useRouter } from "vue-router";
import { useCricketGameStore } from "@/stores/CricketGameStore";
import { onMounted, ref } from "vue";

const gameStore = useCricketGameStore();

const winnerPlayer = gameStore.winnerPlayer;
const nbDarts = ref(0);

const router = useRouter();

const back = () => {
    gameStore.setIsGameFinish(false);
    router.push({ name: "cricket-game"});
}

const replay = () => {

}

onMounted(() => {
    winnerPlayer.volleys.forEach(volley => {
        if(volley.includes("")) {
            volley.forEach(dart => {
                if(dart !== "") nbDarts.value++;
            });
        } else {
            nbDarts.value += 3;
        }
    });
})

</script>

<template>
    <div class="winning-container">
        <LottieAnimation
            class="animation"
            :animation-data="ConfettiAnimation"
            :auto-play="true"
            :loop="true"
            :speed="1"
            ref="anim"
        />
        <div class="winner-content">
            <img class="back" src="@/assets/images/chevron.svg" alt="Retour" @click.prevent="back">
            <img class="player-img" :src="'https://api.dicebear.com/9.x/adventurer/svg?seed=' + winnerPlayer.firstName + winnerPlayer.pseudo + winnerPlayer.lastName" alt="Avatar"></img>
            <div class="player-info">
                <div class="player-info-pseudo">{{ winnerPlayer.pseudo }}</div>
                <div class="player-info-full-name">{{ winnerPlayer.lastName.toUpperCase() }} {{ winnerPlayer.firstName }}</div>
            </div>
        </div>
        <div class="player-stats">
            <div class="points-taken-container">
                <div class="points-taken-text">Nb Darts</div>
                <div class="points-taken-content">{{ nbDarts }}</div>
            </div>
            <div class="points-taken-container" v-for="(value, name) in winnerPlayer.points">
                <div class="points-taken-text">{{ name }}</div>
                <div class="points-taken-content">{{ value }}</div>
            </div>
        </div>
        <div class="btn-replay" @click.prevent="replay">Rejouer</div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

.winning-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .animation {
        position: absolute;
        top: 0;
        left: 0;
    }

    .winner-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50vh;
        position: relative;

        .back {
            position: absolute;
            left: 0;
            top: 1rem;
            transform: rotate(180deg);
            width: 1.5rem;
            height: 1.5rem;
            margin-left: .5rem;
        }

        .player-img {
            display: flex;
            height: 10rem;
            width: 10rem;
            border-radius: 50%;
            background-color: white;
        }

        .player-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            &-pseudo {
                font-family: "Tilt Warp", sans-serif;
                font-size: 1.5rem;
                color: var(--text-color);
                text-align: center;
                margin-top: 1rem;
            }

            &-full-name {
                display: flex;
                font-family: "Tilt Warp", sans-serif;
                font-size: 1rem;
                color: var(--text-color);
                text-align: center;
                margin-top: .5rem;
            }
        }
    }

    .player-stats {
        display: flex;
        background-color: var(--bg-color-secondary);
        border-radius: .5rem;
        width: 90%;
        padding: 1rem;
        box-shadow: rgb(0, 0, 0, .25) 0px 5px 5px 0px inset;
        gap: .5rem;
        white-space: nowrap;
        overflow: auto;

        .points-taken-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-color-primary);
            border-radius: .5rem;
            min-width: 4rem;
            min-height: 4rem;

            .points-taken-text, .points-taken-content {
                font-family: "Tilt Warp", sans-serif;
                color: var(--text-color);
                font-size: 1.5rem;

                &:is(.points-taken-content) {
                    font-size: 1.25rem;
                }
            }
        }
    }

    .btn-replay {
        @include btn-primary;
        & {
            width: 80%;
            margin-top: 1rem;
        }
    }
}
</style>