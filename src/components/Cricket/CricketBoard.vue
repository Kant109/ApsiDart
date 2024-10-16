<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCricketGameStore } from '@/stores/CricketGameStore';

const gameStore = useCricketGameStore();

const players = computed(() => gameStore.players);
const double = ref(false);
const triple = ref(false);
const isGameFinish = computed(() => gameStore.isGameFinish);

const selectDouble = () => {
    if(triple.value) {
        triple.value = false;
    }
    double.value = !double.value;
}

const selectTriple = () => {
    if(double.value) {
        double.value = false;
    }
    triple.value = !triple.value;
}

const setPoints = async (points: number) => {
    players.value.forEach(player => {
        if(!player.isActive) {
            switch(points) {
                case 20:
                    if(player.doors[20] < 3) {
                        player.points[20] += 20;
                        player.points.total += 20;
                    }
                    break;
                case 19:
                    if(player.doors[19] < 3) {
                        player.points[19] += 19;
                        player.points.total += 19;
                    }
                    break;
                case 18:
                    if(player.doors[18] < 3) {
                        player.points[18] += 18;
                        player.points.total += 18;
                    }
                    break;
                case 17:
                    if(player.doors[17] < 3) {
                        player.points[17] += 17;
                        player.points.total += 17;
                    }
                    break;
                case 16:
                    if(player.doors[16] < 3) {
                        player.points[16] += 16;
                        player.points.total += 16;
                    }
                    break;
                case 15:
                    if(player.doors[15] < 3) {
                        player.points[15] += 15;
                        player.points.total += 15;
                    }
                    break;
                case 25:
                    if(player.doors[25] < 3) {
                        player.points[25] += 25;
                        player.points.total += 25;
                    }
                    break;
            }
        }
    })
}

const playerCloseAllDoors = (player: CricketPlayer): boolean => {
    return player.doors[20] >= 3 && player.doors[19] >= 3 && player.doors[18] >= 3 && player.doors[17] >= 3 && player.doors[16] >= 3 && player.doors[15] >= 3 && player.doors[25] >= 3;
}

const playerBestScore = (player: CricketPlayer): boolean => {
    let isPlayerLeastPoints = true;

    players.value.forEach(otherPlayer => {
        if((player !== otherPlayer) && playerCloseAllDoors(otherPlayer)) {
            if(otherPlayer.points.total < player.points.total) {
                isPlayerLeastPoints = false;
            }
        }
    })

    return isPlayerLeastPoints;
}

const checkIsGameFinish = async () => {
    players.value.forEach(async player => {
        if(!isGameFinish.value) {
            gameStore.setIsGameFinish(playerCloseAllDoors(player) && playerBestScore(player));
            gameStore.setIsGameWinner(player);
        }
    });
}

const setPointsActivePlayer = async (points: number) => {
    const value = double.value ? 2 : triple.value ? 3 : 1;
    let activePlayerPointsVolley = true;

    players.value.forEach(async player => {
        if(player.isActive && activePlayerPointsVolley) {
            const currentPointValue = value === 2 ? "D" + points.toString() : value === 3 ? "T" + points.toString() : points.toString();

            switch(points) {
                case 20:
                    for (let index = 0; index < value; index++) {
                        player.doors[20] += 1;
                        if(player.doors[20] > 3) {
                            await setPoints(20);
                        }
                    }
                    break;
                case 19:
                    for (let index = 0; index < value; index++) {
                        player.doors[19] += 1;
                        if(player.doors[19] > 3) {
                            await setPoints(19);
                        }
                    }
                    break;
                case 18:
                    for (let index = 0; index < value; index++) {
                        player.doors[18] += 1;
                        if(player.doors[18] > 3) {
                            await setPoints(18);
                        }
                    }
                    break;
                case 17:
                    for (let index = 0; index < value; index++) {
                        player.doors[17] += 1;
                        if(player.doors[17] > 3) {
                            await setPoints(17);
                        }
                    }
                    break;
                case 16:
                    for (let index = 0; index < value; index++) {
                        player.doors[16] += 1;
                        if(player.doors[16] > 3) {
                            await setPoints(16);
                        }
                    }
                    break;
                case 15:
                    for (let index = 0; index < value; index++) {
                        player.doors[15] += 1;
                        if(player.doors[15] > 3) {
                            await setPoints(15);
                        }
                    }
                    break;
                case 25:
                    for (let index = 0; index < value; index++) {
                        player.doors[25] += 1;
                        if(player.doors[25] > 3) {
                            await setPoints(25);
                        }
                    }
                    break;
            }

            if(player.volleys[player.volleys.length - 1][0] === "") {
                player.volleys[player.volleys.length - 1][0] = currentPointValue;
            } else if(player.volleys[player.volleys.length - 1][1] === "") {
                player.volleys[player.volleys.length - 1][1] = currentPointValue;
            } else if(player.volleys[player.volleys.length - 1][2] === "") {
                player.volleys[player.volleys.length - 1][2] = currentPointValue;

                player.isActive = false;
                if(players.value.indexOf(player) + 1 === players.value.length) {
                    players.value[0].isActive = true;
                    players.value[0].volleys.push(['', '', '']);
                } else {
                    players.value[players.value.indexOf(player) + 1].isActive = true;
                    players.value[players.value.indexOf(player) + 1].volleys.push(['', '', '']);
                }
                activePlayerPointsVolley = false;
            }
        }
    });
    await checkIsGameFinish();
    reset();
}

const removePoints = async (points: number) => {
    players.value.forEach(player => {
        if(!player.isActive) {
            switch(points) {
                case 20:
                    if(player.doors[20] < 3) {
                        player.points[20] -= 20;
                        player.points.total -= 20;
                    }
                    break;
                case 19:
                    if(player.doors[19] < 3) {
                        player.points[19] -= 19;
                        player.points.total -= 19;
                    }
                    break;
                case 18:
                    if(player.doors[18] < 3) {
                        player.points[18] -= 18;
                        player.points.total -= 18;
                    }
                    break;
                case 17:
                    if(player.doors[17] < 3) {
                        player.points[17] -= 17;
                        player.points.total -= 17;
                    }
                    break;
                case 16:
                    if(player.doors[16] < 3) {
                        player.points[16] -= 16;
                        player.points.total -= 16;
                    }
                    break;
                case 15:
                    if(player.doors[15] < 3) {
                        player.points[15] -= 15;
                        player.points.total -= 15;
                    }
                    break;
                case 25:
                    if(player.doors[25] < 3) {
                        player.points[25] -= 25;
                        player.points.total -= 25;
                    }
                    break;
            }
        }
    })
}

const cancelPoints = async (previousDart: string, player: CricketPlayer) => {
    const value = previousDart.includes('T') ? 3 : previousDart.includes('D') ? 2 : 1;

    if(previousDart.includes('20')) {
        const nbDartsInPoints = player.doors[20];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[20] -= 1;
            if(index > 3) {
                await removePoints(20);
            }
        }
    } else if(previousDart.includes('19')) {
        const nbDartsInPoints = player.doors[19];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[19] -= 1;
            if(index > 3) {
                await removePoints(19);
            }
        }
    } else if(previousDart.includes('18')) {
        const nbDartsInPoints = player.doors[18];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[18] -= 1;
            if(index > 3) {
                await removePoints(18);
            }
        }
    } else if(previousDart.includes('17')) {
        const nbDartsInPoints = player.doors[17];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[17] -= 1;
            if(index > 3) {
                await removePoints(17);
            }
        }
    } else if(previousDart.includes('16')) {
        const nbDartsInPoints = player.doors[16];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[16] -= 1;
            if(index > 3) {
                await removePoints(16);
            }
        }
    } else if(previousDart.includes('15')) {
        const nbDartsInPoints = player.doors[15];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[15] -= 1;
            if(index > 3) {
                await removePoints(15);
            }
        }
    } else if(previousDart.includes('25')) {
        const nbDartsInPoints = player.doors[25];

        for (let index = nbDartsInPoints; index > nbDartsInPoints - value; index--) {
            player.doors[25] -= 1;
            if(index > 3) {
                await removePoints(25);
            }
        }
    }
}

const removePreviousDart = async (player: CricketPlayer, isCancel: boolean) => {
    for (let index = 3; index > 0; index--) {
        const previousDart = player.volleys[player.volleys.length - 1][index - 1];

        if(previousDart !== "" && !isCancel) {
            await cancelPoints(previousDart, player);

            player.volleys[player.volleys.length - 1][index - 1] = "";
            isCancel = true;
        }
    }
}

const cancel = () => {
    players.value.forEach(player => {
        if(player.isActive) {
            let isCancel = false;
            if(!(player.volleys[player.volleys.length - 1][0] === "" && player.volleys[player.volleys.length - 1][1] === "" && player.volleys[player.volleys.length - 1][2] === "")) {
                removePreviousDart(player, isCancel);
            } else {
                player.isActive = false;
                if((players.value.indexOf(player) - 1) >= 0) {
                    players.value[players.value.indexOf(player) - 1].isActive = true;
                    removePreviousDart(players.value[players.value.indexOf(player) - 1], isCancel);
                } else {
                    players.value[players.value.length - 1].isActive = true;
                    removePreviousDart(players.value[players.value.length - 1], isCancel);
                }
            }
        }
    });
}

const reset = () => {
    double.value = false;
    triple.value = false;
}

</script>

<template>
    <div class="points-container">
        <div class="points-content">
            <div class="points-line">
                <div class="points" @click.prevent="setPointsActivePlayer(20)">20</div>
                <div class="points" @click.prevent="setPointsActivePlayer(19)">19</div>
                <div class="points" @click.prevent="setPointsActivePlayer(18)">18</div>
                <div class="points" @click.prevent="setPointsActivePlayer(17)">17</div>
                <div class="points" @click.prevent="setPointsActivePlayer(16)">16</div>
                <div class="points" @click.prevent="setPointsActivePlayer(15)">15</div>
                <div class="points" :class="{'isDisable': triple}" @click.prevent="setPointsActivePlayer(25)">25</div>
            </div>
            <div class="instructions">
                <div class="points zero" :class="{'isDisable': double || triple}" @click.prevent="setPointsActivePlayer(0)">0</div>
                <div class="specific">
                    <div class="points double" :class="{'isActive': double && !triple}" @click.prevent="selectDouble">DOUBLE</div>
                    <div class="points triple" :class="{'isActive': triple && !double}" @click.prevent="selectTriple">TRIPLE</div>
                    <div class="points back" @click.prevent="cancel">RETOUR</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/variables.scss";
@import "@/assets/helpers/mixins.scss";

.points-container {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: $light-mode-primary;
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow);

    .points-content {
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem 1.5rem 1rem;
        max-width: 390px;
        width: 100%;

        .points-line {
            display: flex;
            justify-content: space-between;

            .points {
                aspect-ratio: 1/1;
                @include points();
            }
        }

        .instructions {
            display: flex;
            margin-top: .5rem;
            gap: 0.45rem;

            .points {
                aspect-ratio: 1/1;
                @include points();
            }

            .specific {
                display: flex;
                flex-direction: row;
                width: 100%;
                gap: 0.45rem;

                .points{
                    &.double, &.triple, &.back {
                        width: 100%;
                        padding: 0 .5rem 5px 0.5rem;

                        &.isActive {
                            color: rgba(black, .25);
                            box-shadow: none;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 389px) {
    .points-container {
        .points-content {
            max-width: 320px;
            width: 100%;
            padding: 1rem .5rem 1.5rem .5rem;
        }
    }
}

</style>