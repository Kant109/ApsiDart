<script setup lang="ts">
import { useCricketGameStore } from '@/stores/CricketGameStore';
import { useX01GameStore } from '@/stores/X01GameStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const cricketGameStore = useCricketGameStore();
const x01GameStore = useX01GameStore();

const title = ref('');
const players = computed(() => title.value === "CRICKET" ? cricketGameStore.players : x01GameStore.players);

onMounted(() => {
    title.value = (route.params.mode as string).toUpperCase();
})

const addNewPlayer = () => {
    console.log('in adding new player');
}

const launchTime = () => {
    
}

const stopTime = () => {
    
}

</script>

<template>
    <div class="x01-settings-container">
        <div class="header">
            <div class="title">{{ title }}</div>
        </div>
        <div class="adding-player-container">
            <div class="adding-player-recap">
                <div
                    v-for="player in players"
                    class="player-container"
                    @mousedown="launchTime"
                    @mouseup="stopTime"
                >
                    <div class="player-content">
                        <div class="player-img"></div>
                        <div class="player-name">{{ player.pseudo }}</div>
                    </div>
                </div>
            </div>
            <div class="btn-add-player" @click.prevent="addNewPlayer">Ajouter des joueurs</div>            
        </div>
    </div>
</template>

<style lang="scss" scoped>

.x01-settings-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;

    .header {
        width: 100%;
        padding: 1rem .5rem;
        background-color: var(--bg-color-primary);

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 3rem;
            color: var(--text-color);
        }
    }

    .adding-player-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 2rem;

        .adding-player-recap {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            grid-column-gap: 1rem;
            grid-row-gap: 1rem;
            background-color: var(--bg-color-secondary);
            border-radius: .5rem;
            width: 90%;
            padding: 1rem;
            box-shadow: rgb(0, 0, 0, .25) 0px 5px 5px 0px inset;

            .player-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-color-primary);
                width: 100%;
                border-radius: .5rem;

                .player-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: .5rem;
                    padding: .5rem 0;

                    .player-img {
                        height: 2rem;
                        width: 2rem;
                        border-radius: 50%;
                        background-color: white;
                        cursor: pointer;
                    }

                    .player-name {
                        font-family: "Tilt Warp", sans-serif;
                        font-size: 1rem;
                        color: var(--text-color);
                    }
                }
            }
        }

        .btn-add-player {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-color-secondary);
            height: 60px;
            width: 80%;
            border-radius: 1rem;

            font-family: "Tilt Warp", sans-serif;
            font-size: 1.5rem;
            color: var(--text-color);
            padding-bottom: 5px;

            --tw-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, .25);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            border: 1px solid rgba(0, 0, 0, .25);

            &:active {
                color: rgba(black, .25);
                transform: translateY(5px);
                box-shadow: none;
            }
        }
    }
}

</style>