<script setup lang="ts">
import { computed, ref } from 'vue';
import X01Board from '@/components/X01/X01Board.vue';
import X01Player from '@/components/X01/X01Player.vue';
import { useX01GameStore } from '@/stores/X01GameStore';
import { useRouter } from 'vue-router';

const gameStore = useX01GameStore();

const players = computed(() => gameStore.players);
const isGameFinish = computed(() => gameStore.isGameFinish);
const isGameWinner = computed(() => gameStore.isGameWinner);
const isLastPlayerActive = ref(false);
const title = players.value[0].points;

const router = useRouter();

const setIsLastPlayerActive = (isCurrentPlayerLast: boolean) => {
    isLastPlayerActive.value = isCurrentPlayerLast;
}

const back = () => {
    router.push({ name: "darts-mode-x01" });
}

</script>

<template>
    <div class="header">
        <img src="@/assets/images/chevron.svg" alt="Retour" @click.prevent="back">
        <div class="title">{{ title }}</div>
    </div>
    <div class="players-container" v-if="!isGameFinish">
        <div class="players-content" :class="{'lastPlayerActive': isLastPlayerActive}">
            <X01Player
                v-for="player in players"
                :player="player"
                :is-top-bg-active="players.indexOf(player) !== 0"
                :is-top-bg-player-active="players[players.indexOf(player) - 1 > 0 ? players.indexOf(player) - 1 : 0].isActive === true"
                @isLastPlayer="setIsLastPlayerActive"
            />
        </div>
    </div>
    <X01Board v-if="!isGameFinish"/>
    <div v-if="isGameFinish">
        GAME IS FINISH
        {{ isGameWinner.pseudo }}
    </div>
</template>

<style lang="scss" scoped>

.header {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        position: absolute;
        left: 0;
        transform: rotate(180deg);
        width: 1.5rem;
        height: 1.5rem;
        margin-left: .5rem;
    }

    .title {
        display: flex;
        justify-content: center;
        font-family: "Monoton", sans-serif;
        font-size: 3rem;
        padding: 1rem;
        color: var(--text-color);
    }
}

.points-recap-doors {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 390px;
    margin-bottom: 1rem;
    
    .recap-doors {
        display: flex;
        gap: .5rem;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;

        .recap-door {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background-color: var(--bg-color-primary);
            width: 1.5rem;
            aspect-ratio: 1/1;
        }
    }
}

.players-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100% - 287px);
    background-color: var(--bg-color-primary);
    padding-bottom: 2rem;
    overflow: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    .players-content {
        display: flex;
        flex-direction: column;
        max-width: 390px;
        width: 100%;

        &::after {
            content: "";
            height: .75rem;
            border-radius: 0 0 1rem 1rem;
            --tw-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, .25);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            background-color: var(--bg-color-secondary);
        }

        &.lastPlayerActive {
            &::after {
                background-color: var(--active-player);
            }
        }
    }
}

@media screen and (max-width: 389px) {
    .players-container {
        max-height: calc(100vh - 278px);
    }
}
</style>