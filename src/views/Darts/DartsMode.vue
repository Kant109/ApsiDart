<script setup lang="ts">
import { useCricketGameStore } from '@/stores/CricketGameStore';
import { usePlayerStore } from '@/stores/PlayerStore';
import { useX01GameStore } from '@/stores/X01GameStore';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const cricketGameStore = useCricketGameStore();
const x01GameStore = useX01GameStore();
const playerStore = usePlayerStore();

const isSlideTopAnimation = ref(false);
const isCricketSelected = ref(false);
const isX01Selected = ref(false);
const modeTitle = ref('');
const orderedPlayers = computed(() => playerStore.orderedPlayers);

const router = useRouter();

onMounted(() => {
    isSlideTopAnimation.value = true;
    setTimeout(() => {
        isSlideTopAnimation.value = false;
    }, 500);
})

const selectGamemode = (mode: string) => {
    switch (mode) {
        case "cricket":
            modeTitle.value = "CRICKET";
            isCricketSelected.value = true;
            startGame();
            break;
        case "x01":
        modeTitle.value = "X01";
            isX01Selected.value = true;
            startGame();
            break;
    }
}

const startGame = () => {
    if(modeTitle.value === "CRICKET") {
        orderedPlayers.value.forEach((player: Player) => {
            const currentPlayer: CricketPlayer = {
                id: player.id,
                pseudo: player.pseudo,
                isActive: player.order === "1",
                points: {
                    20: 0,
                    19: 0,
                    18: 0,
                    17: 0,
                    16: 0,
                    15: 0,
                    25: 0,
                    total: 0
                },
                doors: {
                    20: 0,
                    19: 0,
                    18: 0,
                    17: 0,
                    16: 0,
                    15: 0,
                    25: 0
                },
                volleys: player.order === "1" ? [['', '', '']] : []
            };

        cricketGameStore.setPlayer(currentPlayer);
        });
        router.push({ name: "cricket-game" })
    } else {
        orderedPlayers.value.forEach((player: Player) => {
            const currentPlayer: X01Player = {
                id: player.id,
                pseudo: player.pseudo,
                isActive: false,
                points: 0,
                volleys: []
            };

            x01GameStore.setPlayer(currentPlayer);
        });
        router.push({ name: "x01-game" })
    }
}

</script>

<template>
    <div class="darts-game-container">
        <div class="header">
            <div class="title">DARTS</div>
        </div>

        <div class="darts-game-chose-mode">
            <div class="choices-container">
                <div class="choice" @click.prevent="selectGamemode('cricket')">Cricket</div>
                <div class="choice" @click.prevent="selectGamemode('x01')">X01</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.darts-game-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;

    .header {
        width: 100%;
        padding: 1rem .5rem;
        background-color: var(--bg-color-primary);
        animation: appear .2s;

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 3rem;
            color: var(--text-color);
        }
    }

    .darts-game-chose-mode {
        display: flex;
        justify-content: center;
        width: 100%;
        animation: appear .2s;
        margin: 2rem 0;

        .choices-container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-around;
            width: 80%;
            gap: 2rem;

            .choice {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-color-secondary);
                height: 60px;
                width: 100%;
                border-radius: 1rem;
                margin: 0 2rem;

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

    .cricket-settings-title-animation {
        position: absolute;
        width: 100%;
        flex-direction: column;
        align-items: center;
        top: 100%;
    
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
    }
}

@keyframes appear {
    0% {
        opacity: 0;
    }
    80% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>