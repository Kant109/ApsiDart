<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCricketGameStore } from "@/stores/CricketGameStore";
import { computed, onMounted, ref } from "vue";
import { register } from 'swiper/element/bundle';

const gameStore = useCricketGameStore();

const playersPosition = computed(() => gameStore.playersPosition);
const stats = computed(() => gameStore.stats);

const router = useRouter();

const replay = () => {
    
}

const backHome = () => {
    gameStore.reset();
    router.push({ name: "home"});
}

onMounted(() => {
    register();

})

</script>

<template>
    <div class="end-game-container">
        <img class="close" src="@/assets/images/close-cross.svg" alt="Close" @click.prevent="backHome">
        <swiper-container
            :navigation="true"
            class="mySwiper"
        >
            <swiper-slide v-for="player in playersPosition">
                <div class="end-game-player-content">
                    <div class="winner-content">
                        <img class="player-img" :src="'https://api.dicebear.com/9.x/adventurer/svg?seed=' + player.firstName + player.pseudo + player.lastName" alt="Avatar"></img>
                        <div class="player-position">{{ playersPosition.indexOf(player) + 1 }} <sup v-if="playersPosition.indexOf(player) === 0">er</sup><sup v-else>ème</sup>/ {{ playersPosition.length }}</div>
                        <div class="player-info">
                            <div class="player-info-pseudo">{{ player.pseudo }}</div>
                            <div class="player-info-full-name">{{ player.firstName }} {{ player.lastName.toUpperCase() }}</div>
                        </div>
                    </div>
                    <div class="stats-container">
                        <div class="first-close-15">Tu as fermé en premier :{{ stats.commonStat.zonestats["15"].idPlayerFirstToclose === player.id ? " 15," : ""}}</div>
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
        top: 1rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
    }

    .mySwiper {
        height: 100%;

        .swiper {
            .swiper-button-next, .swiper-button-prev {
                color: black !important;
            }
        }
    }
    
    .end-game-player-content { 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 100%;
        min-height: 100%;
        background-color: var(--bg-color-primary);
        padding-bottom: 3rem;
        
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
            padding: 2rem 0;
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

            .player-position {
                font-family: "Tilt Warp", sans-serif;
                    font-size: 1rem;
                    color: var(--text-color);
                    text-align: center;
                    margin: 1rem 0;
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