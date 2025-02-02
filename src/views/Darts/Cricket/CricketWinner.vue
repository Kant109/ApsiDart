<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCricketGameStore } from "@/stores/CricketGameStore";
import { computed, onMounted, ref } from "vue";
import { register } from 'swiper/element/bundle';
import type { Door } from "@/interfaces/DoorInterface";

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

const firstToClose = (door: Door, player: CricketPlayer) => {
    return stats.value.commonStat.zonestats[door].idPlayerFirstToClose === player.id;
}

const takeMorePoint = (door: Door, player: CricketPlayer) => {
    return stats.value.commonStat.zonestats[door].idPlayerTakeMorePoint === player.id;
}

const scoreMorePoint = (door: Door, player: CricketPlayer) => {
    return stats.value.commonStat.zonestats[door].idPlayerScoreMorePoint === player.id;
}

onMounted(() => {
    register();
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
                        <img class="player-img" :src="'https://api.dicebear.com/9.x/adventurer/svg?seed=' + player.firstName + player.pseudo + player.lastName" alt="Avatar"></img>
                        <div class="player-info">
                            <div class="player-info-pseudo">{{ player.pseudo }}</div>
                            <div class="player-info-full-name">{{ player.firstName }} {{ player.lastName.toUpperCase() }}</div>
                        </div>
                    </div>
                    <div class="game-stats">
                        <div class="player-position">{{ playersPosition.indexOf(player) + 1 }} <sup v-if="playersPosition.indexOf(player) === 0">er</sup><sup v-else>ème</sup>/ {{ playersPosition.length }}</div>
                    </div>
                    <div class="stats-container">
                        <div class="first-close" v-if="firstToClose('15', player) || firstToClose('16', player) || firstToClose('17', player) || firstToClose('18', player) || firstToClose('19', player) || firstToClose('20', player) || firstToClose('25', player)">Tu as fermé en premier :{{ firstToClose("15", player) ? " 15" : ""}}{{ firstToClose("16", player) ? " 16" : ""}}{{ firstToClose("17", player) ? " 17" : ""}}{{ firstToClose("18", player) ? " 18" : ""}}{{ firstToClose("19", player) ? " 19" : ""}}{{ firstToClose("20", player) ? " 20" : ""}}{{ firstToClose("25", player) ? " 25" : ""}}.</div>
                        <div class="take-more-point" v-if="takeMorePoint('15', player) || takeMorePoint('16', player) || takeMorePoint('17', player) || takeMorePoint('18', player) || takeMorePoint('19', player) || takeMorePoint('20', player) || takeMorePoint('25', player)">Tu es le joueur qui a pris le plus de point dans le numéro {{ takeMorePoint('15', player) ? "15" : takeMorePoint('16', player) ? "16" : takeMorePoint('17', player) ? "17" : takeMorePoint('18', player) ? "18" : takeMorePoint('19', player) ? "19" : takeMorePoint('20', player) ? "20" : takeMorePoint('25', player) ? "25" : "" }} pour un total de {{ takeMorePoint('15', player) ? stats.commonStat.zonestats["15"].maxPointTakenByPlayer : takeMorePoint('16', player) ? stats.commonStat.zonestats["16"].maxPointTakenByPlayer : takeMorePoint('17', player) ? stats.commonStat.zonestats["17"].maxPointTakenByPlayer : takeMorePoint('18', player) ? stats.commonStat.zonestats["18"].maxPointTakenByPlayer : takeMorePoint('19', player) ? stats.commonStat.zonestats["19"].maxPointTakenByPlayer : takeMorePoint('20', player) ? stats.commonStat.zonestats["20"].maxPointTakenByPlayer : takeMorePoint('25', player) ? stats.commonStat.zonestats["25"].maxPointTakenByPlayer : ""}}</div>
                        <div class="score-more-point" v-if="scoreMorePoint('15', player) || scoreMorePoint('16', player) || scoreMorePoint('17', player) || scoreMorePoint('18', player) || scoreMorePoint('19', player) || scoreMorePoint('20', player) || scoreMorePoint('25', player)">Tu es le joueur qui a mis le plus de point dans le numéro {{ scoreMorePoint('15', player) ? "15" : scoreMorePoint('16', player) ? "16" : scoreMorePoint('17', player) ? "17" : scoreMorePoint('18', player) ? "18" : scoreMorePoint('19', player) ? "19" : scoreMorePoint('20', player) ? "20" : scoreMorePoint('25', player) ? "25" : "" }} pour un total de {{ scoreMorePoint('15', player) ? stats.commonStat.zonestats["15"].maxPointScoredByPlayer : scoreMorePoint('16', player) ? stats.commonStat.zonestats["16"].maxPointScoredByPlayer : scoreMorePoint('17', player) ? stats.commonStat.zonestats["17"].maxPointScoredByPlayer : scoreMorePoint('18', player) ? stats.commonStat.zonestats["18"].maxPointScoredByPlayer : scoreMorePoint('19', player) ? stats.commonStat.zonestats["19"].maxPointScoredByPlayer : scoreMorePoint('20', player) ? stats.commonStat.zonestats["20"].maxPointScoredByPlayer : scoreMorePoint('25', player) ? stats.commonStat.zonestats["25"].maxPointScoredByPlayer : ""}}</div>
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