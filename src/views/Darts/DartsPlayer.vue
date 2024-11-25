<script setup lang="ts">
import { useManagementAppStore } from '@/stores/ManagementAppStore';
import { computed, onMounted, ref, Teleport } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const managementAppStore = useManagementAppStore();

const allPlayers = ref([] as Array<Player>);
const orderedPlayers = ref([] as Array<Player>);
const selectedPlayers = ref([] as Array<Player>);
const openSearchPlayer = ref(false);
const isDarkMode = computed(() => managementAppStore.isDarkMode);
const modificationMode = ref(false);
const isRemovePlayerMode = ref(false);
const changeOrderMode = ref(false);

onMounted(async () => {
    if((localStorage.getItem('orderedDartsPlayer') as string) !== null) {
        const playersFromLocalStorage = JSON.parse(localStorage.getItem('orderedDartsPlayer') as string) as Array<Player>;
        playersFromLocalStorage.forEach(player => {
            orderedPlayers.value.push(player);
            selectedPlayers.value.push(player);
        });
    }
    if(selectedPlayers.value.length < 1) {
        openSearchPlayer.value = true;
    }

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
    player.order = (orderedPlayers.value.length + 1).toString();
    orderedPlayers.value.push(player);
    setTimeout(() => {
        allPlayers.value.splice(indexOfPlayer, 1);
    }, 400);
}

const playerAction = (player: Player) => {
    if(isRemovePlayerMode.value) {
        if(parseInt(player.order as string) < orderedPlayers.value.length) {
            for (let index = orderedPlayers.value.indexOf(player); index < orderedPlayers.value.length; index++) {
                const newOrder = (parseInt(selectedPlayers.value[index].order as string) - 1).toString();
                selectedPlayers.value[index].order = newOrder;
                orderedPlayers.value[index].order = newOrder;
            }
        }
        const indexOfPlayer = selectedPlayers.value.indexOf(player);
        selectedPlayers.value.splice(indexOfPlayer, 1);
        const indexOfPlayerInOrder = orderedPlayers.value.indexOf(player);
        orderedPlayers.value.splice(indexOfPlayerInOrder, 1);
        allPlayers.value.push(player);
    }
    if(changeOrderMode.value) {
        if(player.order !== undefined && player.order !== "") {
            const playerIndex = orderedPlayers.value.indexOf(player);
            for (let index = orderedPlayers.value.length - 1; index >= playerIndex; index--) {
                selectedPlayers.value[selectedPlayers.value.indexOf(orderedPlayers.value[index])].order = "";
                orderedPlayers.value.pop();
            }
        } else {
            orderedPlayers.value.push(player);
            player.order = (orderedPlayers.value.indexOf(player) + 1).toString();
        }
    }
}

const startGame = () => {
    localStorage.removeItem('orderedDartsPlayer');
    localStorage.setItem('orderedDartsPlayer', JSON.stringify(orderedPlayers.value));
    router.push({ name: "darts-mode"});
}

const validPlayers = () => {
    if(!isRemovePlayerMode.value && !changeOrderMode.value) {
        modificationMode.value = false;
    }
    isRemovePlayerMode.value = false;
    changeOrderMode.value = false;
}

const modification = () => {
    modificationMode.value = true;
}

const removePlayers = () => {
    isRemovePlayerMode.value = true;
}

const changeOrder = () => {
    changeOrderMode.value = true;
}

</script>

<template>
    <div class="settings-container">
        <div class="header">
            <div class="title">FLÉCHETTES</div>
        </div>
        <div class="adding-player-container">
            <div class="adding-player-recap" v-if="selectedPlayers.length > 0">
                <div
                    v-for="player in selectedPlayers"
                    class="player-container"
                    :class="{'remove-player': isRemovePlayerMode}"
                    @click.prevent="playerAction(player)"
                >
                    <div class="player-content">
                        <div class="player-img" v-if="!changeOrderMode"></div>
                        <div class="player-order" v-else >{{ player.order }}</div>
                        <div class="player-name">{{ player.pseudo }}</div>
                    </div>
                </div>
            </div>
            <div class="btn-container">
                <div v-if="isRemovePlayerMode || changeOrderMode || modificationMode" class="btn-save-players" @click.prevent="validPlayers">Valider</div>
                <div v-if="!isRemovePlayerMode && !changeOrderMode && !modificationMode" class="btn-add-player" @click.prevent="addNewPlayer">Ajouter des joueurs</div>
                <div v-if="selectedPlayers.length > 0 && !isRemovePlayerMode && !changeOrderMode && !modificationMode" class="btn-start-game" @click.prevent="startGame">Choix du mode</div>
                <div v-if="selectedPlayers.length > 0 && !isRemovePlayerMode && !changeOrderMode && !modificationMode" class="btn-modif-player" @click.prevent="modification">Modifier</div>
                <div v-if="selectedPlayers.length > 0 && !isRemovePlayerMode && !changeOrderMode && modificationMode" class="btn-remove-player" @click.prevent="removePlayers">Supprimer des joueurs</div>
                <div v-if="selectedPlayers.length > 0 && !isRemovePlayerMode && !changeOrderMode && modificationMode" class="btn-change-order" @click.prevent="changeOrder">Changer l'ordre</div>
            </div>
        </div>
    </div>
    <Teleport defer to=".settings-container" target=".settings-container">
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
                <div class="btn-close-modal" @click.prevent="closeModal">Valider</div>
            </div>   
        </dialog>
    </Teleport>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

.settings-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;

    dialog {
        width: 90%;
        border-radius: .5rem;
        border: none;
        background-color: var(--bg-color-secondary);
        position: absolute;
        top: 25vw;
        overflow: hidden;
        backdrop-filter: blur(10px);

        .dialog-title {
            display: flex;
            font-family: "Tilt Warp", sans-serif;
            font-size: 1.5rem;
            color: var(--text-color);
            text-align: center;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .search-player {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            
            div {
                &.send-out {
                    animation: send-out 1s;
                }

                .select-player-container {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: 1fr;
                    grid-column-gap: 0px;
                    grid-row-gap: 0px;
                    align-items: center;

                    .player-img {
                        height: 2rem;
                        width: 2rem;
                        border-radius: 50%;
                        border: 1px solid black;
                        background-color: white;
                        cursor: pointer;
                        grid-area: 1 / 1 / 2 / 2;
                    }

                    .player-name {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        font-family: "Tilt Warp", sans-serif;
                        font-size: 1.5rem;
                        grid-area: 1 / 2 / 2 / 5;

                        .player-name-pseudo, .player-full-name {
                            display: flex;
                            font-family: "Tilt Warp", sans-serif;
                            font-size: 1rem;
                            color: var(--text-color);
                        }
                    }
                }
                    
                .select-player {
                    position: relative;
                    background-color: black;

                    &::after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: -1.5rem;
                        right: .5rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        background-image: url("@/assets/images/black-right-arrow.svg");
                    }

                    &.darkmode {
                        &::after {
                            background-image: url("@/assets/images/white-right-arrow.svg");
                        }
                    }
                }
            }

            .btn-close-modal {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-color-secondary);
                height: 60px;
                width: 100%;
                border-radius: 1rem;
                margin-top: 1.5rem;

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

    .header {
        width: 100%;
        padding: 1rem .5rem;
        background-color: var(--bg-color-primary);

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 2.5rem;
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

                    .player-order {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 3rem;
                        width: 3rem;
                        border-radius: 50%;
                        background-color: white;
                        cursor: pointer;
                        font-family: "Tilt Warp", sans-serif;
                        font-size: 2rem;
                        color: var(--text-color);
                        border: 2px solid;
                        animation: bounce-border-color 1s infinite;
                    }

                    .player-name {
                        font-family: "Tilt Warp", sans-serif;
                        font-size: 1rem;
                        color: var(--text-color);
                    }
                }
            }
        }

        .btn-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80%;
            gap: 1rem;
            
            .btn-start-game, .btn-save-players {
                @include btn-primary;
            }
            
            .btn-add-player, .btn-modif-player, .btn-change-order, .btn-remove-player {
                @include btn-secondary;
            }
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