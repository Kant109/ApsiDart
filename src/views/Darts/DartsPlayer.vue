<script setup lang="ts">
import Header from '@/components/Header.vue';
import { useManagementAppStore } from '@/stores/ManagementAppStore';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const managementAppStore = useManagementAppStore();

const allPlayers = ref([] as Array<Player>);
const selectedPlayers = ref([] as Array<Player>);
const openSearchPlayer = ref(false);
const isDarkMode = computed(() => managementAppStore.isDarkMode);
const modificationMode = ref(false);
const isRemovePlayerMode = ref(false);
const changeOrderMode = ref(false);
const modalTitle = ref("Sélectionner des joueurs");
const creatingPlayer = ref(false);
const formError = ref(false);
const nextPlayerPlace = ref(1);
const messageErrorNbPlayer = ref(false);

const name = ref("");
const firstname = ref("");
const pseudo = ref("");


onMounted(async () => {
    if((localStorage.getItem('orderedDartsPlayer') as string) !== null) {
        const playersFromLocalStorage = JSON.parse(localStorage.getItem('orderedDartsPlayer') as string) as Array<Player>;
        playersFromLocalStorage.forEach(player => {
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

    if(selectedPlayers.value.length > 0) {
        selectedPlayers.value.forEach(player => {
            player.order = (selectedPlayers.value.indexOf(player) + 1).toString();
            allPlayers.value.forEach(playerFromApi => {
                if(player.id === playerFromApi.id) {
                    allPlayers.value.splice(allPlayers.value.indexOf(playerFromApi), 1);
                }
            })
        });
    }
})

const addNewPlayer = async () => {
    openSearchPlayer.value = true;
    messageErrorNbPlayer.value = false;
}

const closeModal = () => {
    openSearchPlayer.value = false;
}

const selectPlayer = (player: Player) => {
    const indexOfPlayer = allPlayers.value.indexOf(player);
    player.order = (selectedPlayers.value.length + 1).toString();
    selectedPlayers.value.push(player);
    setTimeout(() => {
        allPlayers.value.splice(indexOfPlayer, 1);
    }, 400);
}

const playerAction = (player: Player) => {
    if(isRemovePlayerMode.value) {
        if(parseInt(player.order as string) < selectedPlayers.value.length) {
            for (let index = selectedPlayers.value.indexOf(player) + 1; index < selectedPlayers.value.length; index++) {
                const newOrder = (parseInt(selectedPlayers.value[index].order as string) - 1).toString();
                selectedPlayers.value[index].order = newOrder;
            }
        }
        const indexOfPlayer = selectedPlayers.value.indexOf(player);
        selectedPlayers.value.splice(indexOfPlayer, 1);
        allPlayers.value.push(player);
    }
    if(changeOrderMode.value) {
        player.order = nextPlayerPlace.value.toString();
        nextPlayerPlace.value++;
    }
}

const startGame = () => {
    if(selectedPlayers.value.length > 1) {
        router.push({ name: "darts-mode"});
        localStorage.removeItem('orderedDartsPlayer');
        
        let orderedDartsPlayer = Array(selectedPlayers.value.length).fill("");
        
        selectedPlayers.value.forEach(player => {
            orderedDartsPlayer[parseInt(player.order as string) - 1] = player;
        })
        
        localStorage.setItem('orderedDartsPlayer', JSON.stringify(orderedDartsPlayer));
    } else {
        messageErrorNbPlayer.value = true;
    }
}

const validPlayers = () => {
    if(!isRemovePlayerMode.value && !changeOrderMode.value) {
        modificationMode.value = false;
    }
    isRemovePlayerMode.value = false;
    selectedPlayers.value.forEach(player => {
        if(player.order === "") return;
    });
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
    nextPlayerPlace.value = 1;
    selectedPlayers.value.forEach(player => {
        player.order = "";
    });
}

const addingPlayer = () => {
    modalTitle.value = "Nouveau joueur";
    creatingPlayer.value = true;
}

const createPlayer = async () => {
    if (firstname.value.length < 1 && name.value.length < 1 && pseudo.value.length < 1) {
        formError.value = true;
        return;
    }

    modalTitle.value = "Sélectionner des joueurs";
    creatingPlayer.value = false;
    formError.value = false;
    
    let player = {
        "firstName": firstname.value,
        "lastName": name.value,
        "pseudo": pseudo.value
    }

    firstname.value = "";
    name.value = "";
    pseudo.value = "";
    
    try {
        const response = await fetch(import.meta.env.VITE_BE_URL + "/players", {
            method: "POST",
            body: JSON.stringify(player),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        Object.assign(player, { id: await response.json() });
        Object.assign(player, { order: (selectedPlayers.value.length + 1).toString() });

        selectedPlayers.value.push(player as Player);
    } catch (error: any) {
        console.error(error.message);
    }
}

const cancel = () => {
    creatingPlayer.value = false;
}

const back = () => {
    router.push({ name: "home" });
}

</script>

<template>
    <div class="settings-container" :class="{'blur': openSearchPlayer}">
        <Header title="FLÉCHETTES" @previous-route="back" />
        <div class="adding-player-container">
            <div class="adding-player-recap" v-if="selectedPlayers.length > 0">
                <div
                    v-for="player in selectedPlayers"
                    class="player-container"
                    :class="{'remove-player': isRemovePlayerMode}"
                    @click.prevent="playerAction(player)"
                >
                    <div class="player-content">
                        <img class="player-img" :src="'https://api.dicebear.com/9.x/adventurer/svg?seed=' + player.firstName + player.pseudo + player.lastName" alt="Avatar" v-if="!changeOrderMode && !modificationMode" />
                        <div class="player-order" :class="{'change-order': changeOrderMode}" v-else >{{ player.order }}</div>
                        <div class="player-name">{{ player.pseudo.length > 5 ? player.pseudo.substring(0,5) + ".." : player.pseudo}}</div>
                    </div>
                </div>
            </div>
            <div class="error-nb-player" v-if="messageErrorNbPlayer">Il faut minimum 2 joueurs pour lancer une partie</div>
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
    <Teleport to="main">
        <dialog class="search-player-dialog" :open="openSearchPlayer">
            <div class="dialog-title">{{ modalTitle }}</div>
            <div class="search-player" v-if="!creatingPlayer">
                <div class="btn-create-modal" @click.prevent="addingPlayer">Créer un joueur</div>
                <div v-for="player in allPlayers" :class="{'send-out': selectedPlayers.includes(player)}">  
                    <div class="select-player-container" v-if="allPlayers.includes(player)">
                        <img class="player-img" :src="'https://api.dicebear.com/9.x/adventurer/svg?seed=' + player.firstName + player.pseudo + player.lastName" alt="Avatar" />
                        <div class="player-name">
                            <div class="player-name-pseudo">{{ player.pseudo.length > 18 ? player.pseudo.substring(0,18) + ".." : player.pseudo}}</div>
                            <div class="player-full-name">{{ player.firstName.length + player.lastName.length > 18 ? (player.firstName + " " + player.lastName).substring(0,18) + ".." : player.firstName + " " + player.lastName}}</div>
                        </div>
                    </div>
                    <div class="select-player" :class="{'darkmode': isDarkMode}" @click.prevent="selectPlayer(player)"></div>
                </div>
                <div class="btn-close-modal" @click.prevent="closeModal">Valider</div>
            </div>
            <div class="create-player" v-if="creatingPlayer">
                <div class="input" :class="{'error': formError}">
                    <label for="firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname" minlength="2" required v-model="firstname" />
                    <span>Votre nom doit contenir au moins 2 caractères</span>
                </div>
                
                <div class="input" :class="{'error': formError}">
                    <label for="name">Nom</label>
                    <input type="text" id="name" name="name" minlength="2" required v-model="name" />
                    <span>Votre prénom doit contenir au moins 2 caractères</span>
                </div>
                
                <div class="input" :class="{'error': formError}">
                    <label for="name">Pseudo</label>
                    <input type="text" id="name" name="name" required minlength="2" v-model="pseudo" />
                    <span>Votre pseudo doit contenir au moins 2 caractères</span>
                </div>

                <div class="btn-save-player-modal" @click.prevent="createPlayer">Créer le joueur</div>
                <div class="btn-cancel-modal" @click.prevent="cancel">Annuler</div>
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
    overflow: scroll;
    padding-bottom: 2rem;

    &.blur {
        filter: blur(10px);
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
                        background-color: var(--bg-color-secondary);
                        cursor: pointer;
                        font-family: "Tilt Warp", sans-serif;
                        font-size: 2rem;
                        color: var(--text-color);
                        border: 2px solid;
                        
                        &.change-order {
                            animation: bounce-border-color 1s infinite;
                        }
                    }

                    .player-name {
                        font-family: "Tilt Warp", sans-serif;
                        font-size: 1rem;
                        color: var(--text-color);
                    }
                }
            }
        }

        .error-nb-player {
            font-family: "Tilt Warp", sans-serif;
            font-size: .75rem;
            color: red;
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