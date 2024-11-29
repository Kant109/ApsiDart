<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue";
import ConfettiAnimation from "../../assets/animations/confetti.json";
import { useRouter } from "vue-router";
import { useCricketGameStore } from "@/stores/CricketGameStore";

const gameStore = useCricketGameStore();

const router = useRouter();

const back = () => {
    gameStore.setIsGameFinish(false);
    router.push({ name: "cricket-game"});
}

const replay = () => {

}

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
            <img src="@/assets/images/chevron.svg" alt="Retour" @click.prevent="back">
            <div class="player-img"></div>
            <div class="player-info">
                <div class="player-info-pseudo">Mati</div>
                <div class="player-info-full-name">CHARRIER Matis</div>
            </div>
        </div>
        <div class="player-stats"></div>
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

        img {
            position: absolute;
            left: 0;
            top: 1rem;
            transform: rotate(180deg);
            width: 1.5rem;
            height: 1.5rem;
            margin-left: .5rem;
        }

        .player-img {
            height: 10rem;
            width: 10rem;
            border-radius: 50%;
            background-color: white;
            cursor: pointer;
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

    }

    .btn-replay {
        @include btn-primary;
        & {
            width: 80%;
        }
    }
}
</style>