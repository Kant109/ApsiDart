<script setup lang="ts">
import router from '@/router';
import { useCricketGameStore } from '@/stores/CricketGameStore';
import { useManagementAppStore } from '@/stores/ManagementAppStore';
import { useX01GameStore } from '@/stores/X01GameStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const managementAppStore = useManagementAppStore();
const cricketGameStore = useCricketGameStore();
const x01GameStore = useX01GameStore();

const title = ref('');
const allPlayers = ref([] as Array<Player>);
const selectedPlayers = ref([] as Array<Player>);
const openSearchPlayer = ref(false);
const isDarkMode = computed(() => managementAppStore.isDarkMode);
const isRemovePlayerMode = ref(false);
const changeOrderMode = ref(false);

onMounted(async () => {
    title.value = (route.params.mode as string).toUpperCase();
    const url = import.meta.env.VITE_BE_URL + "/players";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        allPlayers.value = await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
})

const addNewPlayer = async () => {
    openSearchPlayer.value = true;
}

const closeModal = () => {
    openSearchPlayer.value = false;
}

const selectPlayer = (player: Player) => {
    const indexOfPlayer = allPlayers.value.indexOf(player);
    selectedPlayers.value.push(player);
    setTimeout(() => {
        allPlayers.value.splice(indexOfPlayer, 1);
    }, 400);
}

const removePlayer = (player: Player) => {
    if(isRemovePlayerMode.value) {
        const indexOfPlayer = selectedPlayers.value.indexOf(player);
        selectedPlayers.value.splice(indexOfPlayer, 1);
        allPlayers.value.push(player);
    }
}

const startGame = () => {
    if(title.value === "CRICKET") {
        selectedPlayers.value.forEach((player: Player) => {
            const currentPlayer: CricketPlayer = {
                id: player.id,
                pseudo: player.pseudo,
                isActive: false,
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
                volleys: []
            };

        cricketGameStore.setPlayer(currentPlayer);
        });
        router.push({ name: "cricket-game" })
    } else {
        selectedPlayers.value.forEach((player: Player) => {
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

const validPlayers = () => {
    isRemovePlayerMode.value = false;
    changeOrderMode.value = false;
}

const removePlayers = () => {
    isRemovePlayerMode.value = true;
}

const changeOrder = () => {
    changeOrderMode.value = true;
}

</script>

<template>
    <div class="settings-container" :class="{'blur': openSearchPlayer}">
        <div class="header">
            <div class="title">{{ title }}</div>
        </div>
        <div class="adding-player-container">
            <div class="adding-player-recap" v-if="selectedPlayers.length > 0">
                <div
                    v-for="player in selectedPlayers"
                    class="player-container"
                    :class="{'remove-player': isRemovePlayerMode}"
                    @click.prevent="removePlayer(player)"
                >
                    <div class="player-content">
                        <div class="player-img" v-if="!changeOrderMode"></div>
                        <div class="player-name">{{ player.pseudo }}</div>
                    </div>
                </div>
            </div>
            <div v-if="isRemovePlayerMode || changeOrderMode" class="btn-save-players" @click.prevent="validPlayers">Valider</div>
            <div v-if="!isRemovePlayerMode && !changeOrderMode" class="btn-add-player" @click.prevent="addNewPlayer">Ajouter des joueurs</div>
            <div v-if="selectedPlayers.length > 0 && !isRemovePlayerMode && !changeOrderMode" class="btn-remove-player" @click.prevent="removePlayers">Supprimer des joueurs</div>
            <div v-if="selectedPlayers.length > 0 && !changeOrderMode" class="btn-change-order" @click.prevent="changeOrder">Changer l'ordre des joueurs</div>
            <div v-if="selectedPlayers.length > 0 && !isRemovePlayerMode && !changeOrderMode" class="btn-start-game" @click.prevent="startGame">Commencer la partie</div>
            <Teleport to="body">
                <dialog :open="openSearchPlayer">
                    <div class="dialog-title">Sélectionner les joueurs</div>
                    <div class="search-player">
                        <div v-for="player in allPlayers" :class="{'send-out': selectedPlayers.includes(player)}">  
                            <div class="select-player-container" v-if="allPlayers.includes(player)">
                                <div class="player-img"></div>
                                <div class="player-name">
                                    <div class="player-name-pseudo">{{ player.pseudo }}</div>
                                    <div class="player-full-name">{{ player.lastName }} {{ player.firstName }}</div>
                                </div>
                            </div>
                            <div class="select-player" :class="{'darkmode': isDarkMode}" @click.prevent="selectPlayer(player)"></div>
                        </div>
                        <div class="btn-close-modal" @click.prevent="closeModal">Annuler</div>
                    </div>   
                </dialog>
            </Teleport>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.settings-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    
    &.blur {
        filter: blur(10px);
    }

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
        gap: 1rem;
        animation: appear .5s;

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
            margin-bottom: 1rem;
            box-shadow: rgb(0, 0, 0, .25) 0px 5px 5px 0px inset;

            .player-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-color-primary);
                width: 100%;
                border-radius: .5rem;
                border: 5px solid var(--bg-color-primary);

                &.remove-player {
                    border: 5px solid;
                    animation: bounce-border-color 1s infinite;
                }

                .player-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: .5rem;
                    padding: .5rem 0;

                    .player-img {
                        height: 3rem;
                        width: 3rem;
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

        .btn-add-player, .btn-start-game, .btn-save-players {
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

        .btn-change-order, .btn-remove-player {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Tilt Warp", sans-serif;
            font-size: 1rem;
            color: var(--text-color);
            text-decoration: underline;
        }
    }
}

@keyframes appear {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes bounce-border-color {
    0%, 100% {
        border-color: rgba(red, .25);
    }
    50% {
        border-color: red;
    }
}

</style>