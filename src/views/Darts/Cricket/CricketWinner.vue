<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCricketGameStore } from "@/stores/CricketGameStore";
import { computed, onMounted, ref } from "vue";
import { register } from 'swiper/element/bundle';

const gameStore = useCricketGameStore();

const playersPosition = computed(() => gameStore.playersPosition);
const stats = computed(() => gameStore.playersStats);

const router = useRouter();

const replay = () => {
    gameStore.gameId = 0;
}

const backHome = () => {
    gameStore.reset();
    router.push({ name: "home"});
}

onMounted(async () => {
    register();
    try {
        const response = await fetch(import.meta.env.VITE_BE_URL + "/dart/stat/game/" + gameStore.gameId + "/detail?typeGame=DACKT");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        gameStore.playersStats = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
})

</script>

<template>
    <div class="end-game-container">
        <img class="close" src="@/assets/images/thin-close.svg" alt="Close" @click.prevent="backHome">
        <swiper-container
            :navigation="true"
            class="mySwiper"
        >
            <swiper-slide v-for="player in playersPosition">
                <div class="end-game-player-content">
                    <div class="winner-content">
                        <img class="player-img" :src="'https://api.dicebear.com/9.x/adventurer/svg?seed=' + player.firstName + player.pseudo + player.name" alt="Avatar"></img>
                        <div class="player-info">
                            <div class="player-info-pseudo">{{ player.pseudo }}</div>
                            <div class="player-info-full-name">{{ player.firstName }} {{ player.name.toUpperCase() }}</div>
                        </div>
                    </div>
                    <div class="game-stats">
                        <div class="player-position">{{ playersPosition.indexOf(player) + 1 }} <sup v-if="playersPosition.indexOf(player) === 0">er</sup><sup v-else>ème</sup>/ {{ playersPosition.length }}</div>
                    </div>
                    <div class="stats-container">
                        Test
                    </div>
                    <div class="btn-replay" @click.prevent="replay">Rejouer</div>
                </div>
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

.end-game-container {
    position: relative;
    width: 100%;
    height: 100%;

    .close {
        position: absolute;
        z-index: 999;
        top: 1.5rem;
        right: 1.5rem;
        width: 2rem;
        height: 2rem;
    }

    .mySwiper {
        height: 100%;
    }
    
    .end-game-player-content { 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-width: calc(100% - 2rem);
        min-height: calc(100% - 2rem);
        background-color: white;
        margin: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid rgba(0, 0, 0, .25);
        
        .animation {
            position: absolute;
            top: 0;
            left: 0;
        }

        .winner-content {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;

            .player-img {
                display: flex;
                height: 10rem;
                width: 10rem;
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

        .player-position {
            font-family: "Tilt Warp", sans-serif;
            font-size: 1rem;
            color: var(--text-color);
            text-align: center;
            margin: 1rem 0;
        }

        .stats-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        .btn-replay {
            @include btn-primary;
            & {
                width: 80%;
                margin-top: 1rem;
            }
        }
    }
}
</style>