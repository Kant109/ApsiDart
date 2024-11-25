<script setup lang="ts">
import { useCricketGameStore } from '@/stores/CricketGameStore';
import { useX01GameStore } from '@/stores/X01GameStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const cricketGameStore = useCricketGameStore();
const x01GameStore = useX01GameStore();

const isCricketSelected = ref(false);
const isX01Selected = ref(false);
const title = ref('FLÉCHETTES');
const orderedPlayers = computed(() => JSON.parse(localStorage.getItem('orderedDartsPlayer') as string));
const x01Mode = ref(0);
const nbTeams = ref(2);
const selectCricketTeamMode = ref(false);

const router = useRouter();

const selectGamemode = (mode: string) => {
    switch (mode) {
        case "cricket":
            title.value = "CRICKET";
            isCricketSelected.value = true;
            break;
        case "x01":
            title.value = "X01";
            isX01Selected.value = true;
            break;
    }
}

const selectX01Mode = (selectedX01Mode: number) => {
    x01Mode.value = selectedX01Mode;
    startGame();
}

const selectCricketMode = (selectedCricketMode: string) => {
    if(selectedCricketMode === 'simple') {
        startGame();
    } else if(selectedCricketMode === 'team') {
        selectCricketTeamMode.value = true;
    }

}

const startGame = () => {
    if(title.value === "CRICKET") {
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
                isActive: player.order === "1",
                points: x01Mode.value,
                volleys: player.order === "1" ? [['', '', '']] : []
            };

            x01GameStore.setPlayer(currentPlayer);
        });
        router.push({ name: "x01-game" })
    }
}

const cancel = (removeMode: string) => {
    switch(removeMode) {
        case "cricketTeam":
            selectCricketTeamMode.value = false;
            break;
        case "mode":
            isCricketSelected.value =
            isX01Selected.value = false;
            break;
        case "player":
            router.push({ name: "darts-player" });
    }
}

const selectNbTeam = (nbTeamChoice: number) => {
    nbTeams.value = nbTeamChoice;
}

</script>

<template>
    <div class="darts-game-container">
        <div class="header">
            <div class="title">{{ title }}</div>
        </div>

        <div class="darts-game-chose-mode">
            <div class="choices-container" v-if="!isCricketSelected && !isX01Selected">
                <div class="choice" @click.prevent="selectGamemode('cricket')">Cricket</div>
                <div class="choice" @click.prevent="selectGamemode('x01')">X01</div>
                <div class="btn-cancel" @click.prevent="cancel('player')">Annuler</div>
            </div>
            <div class="cricket-choice-container" v-if="isCricketSelected && !selectCricketTeamMode">
                <div class="btn-simple-mode" @click.prevent="selectCricketMode('simple')" v-if="!selectCricketTeamMode">Simple</div>
                <div class="btn-team-mode" @click.prevent="selectCricketMode('team')" v-if="!selectCricketTeamMode">Équipe</div>
                <div class="btn-cancel" @click.prevent="cancel('mode')">Annuler</div>
            </div>
            <div class="x01-choice-container" v-if="isX01Selected">
                <div class="btn-simple-mode" @click.prevent="selectX01Mode(301)">301</div>
                <div class="btn-team-mode" @click.prevent="selectX01Mode(501)">501</div>
                <div class="btn-cancel" @click.prevent="cancel('mode')">Annuler</div>
            </div>

            <div class="cricket-team-mode" v-if="selectCricketTeamMode">
                <div class="nb-team-container">
                    <h3>Sélectionner le nombre d'équipes</h3>
                    <div class="nb-team-choices">
                        <div class="nb-team-choice" @click.prevent="selectNbTeam(2)">2</div>
                        <div class="nb-team-choice" @click.prevent="selectNbTeam(3)">3</div>
                        <div class="nb-team-choice" @click.prevent="selectNbTeam(4)">4</div>
                    </div>
                </div>
                <div class="btn-cancel" @click.prevent="cancel('cricketTeam')">Annuler</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

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
            font-size: 2.5rem;
            color: var(--text-color);
        }
    }

    .darts-game-chose-mode {
        display: flex;
        justify-content: center;
        width: 100%;
        animation: appear .2s;

        .choices-container, .cricket-choice-container, .x01-choice-container {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-around;
            width: 80%;
            gap: 2rem;

            .choice, .btn-simple-mode, .btn-team-mode {
                @include btn-primary;
            }

            .btn-cancel {
                @include btn-secondary;
            }
        }

        .cricket-team-mode {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            .nb-team-container {
                display: flex;
                flex-direction: column;
                width: 80%;
                align-items: center;

                h3 {
                    font-family: "Tilt Warp", sans-serif;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    text-align: center;
                }

                .nb-team-choices {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;

                    .nb-team-choice {
                        @include btn-primary;
                        & {
                            width: 60px;
                            margin: 0;
                        }
                    }

                }

            }

            .btn-cancel {
                @include btn-secondary;
                & {
                    margin-top: 1rem;
                }
            }
        }
    }
}

@keyframes appear {
    0%, 80% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>