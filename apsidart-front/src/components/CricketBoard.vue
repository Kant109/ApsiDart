<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores/GameStore';

const gameStore = useGameStore();

const players = computed(() => gameStore.players);
const double = ref(false);
const triple = ref(false);

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

const setPoints = (points: number) => {
    players.value.forEach(player => {
        if(!player.isActive) {
            switch(points) {
                case 20:
                    if(player.doors[20].includes(false)) {
                        player.points[20] += 20;
                        player.points.total += 20;
                    }
                    break;
                case 19:
                    if(player.doors[19].includes(false)) {
                        player.points[19] += 19;
                        player.points.total += 19;
                    }
                    break;
                case 18:
                    if(player.doors[18].includes(false)) {
                        player.points[18] += 18;
                        player.points.total += 18;
                    }
                    break;
                case 17:
                    if(player.doors[17].includes(false)) {
                        player.points[17] += 17;
                        player.points.total += 17;
                    }
                    break;
                case 16:
                    if(player.doors[16].includes(false)) {
                        player.points[16] += 16;
                        player.points.total += 16;
                    }
                    break;
                case 15:
                    if(player.doors[15].includes(false)) {
                        player.points[15] += 15;
                        player.points.total += 15;
                    }
                    break;
                case 25:
                    if(player.doors[25].includes(false)) {
                        player.points[25] += 25;
                        player.points.total += 25;
                    }
                    break;
            }
        }
    })
}

const setPointsActivePlayer = (points: number) => {
    const value = double.value ? 2 : triple.value ? 3 : 1;
    let activePlayerPointsVolley = true;

    players.value.forEach(player => {
        if(player.isActive && activePlayerPointsVolley) {
            const currentPointValue = value === 2 ? "D" + points.toString() : value === 3 ? "T" + points.toString() : points.toString();

            switch(points) {
                case 20:
                    for (let index = 0; index < value; index++) {
                        !player.doors[20].includes(false) ? setPoints(20) : player.doors[20][player.doors[20].indexOf(false)] = true;
                    }

                    break;
                case 19:
                    for (let index = 0; index < value; index++) {
                        !player.doors[19].includes(false) ? setPoints(19) : player.doors[19][player.doors[19].indexOf(false)] = true;
                    }
                    break;
                case 18:
                    for (let index = 0; index < value; index++) {
                        !player.doors[18].includes(false) ? setPoints(18) : player.doors[18][player.doors[18].indexOf(false)] = true;
                    }
                    break;
                case 17:
                    for (let index = 0; index < value; index++) {
                        !player.doors[17].includes(false) ? setPoints(17) : player.doors[17][player.doors[17].indexOf(false)] = true;
                    }
                    break;
                case 16:
                    for (let index = 0; index < value; index++) {
                        !player.doors[16].includes(false) ? setPoints(16) : player.doors[16][player.doors[16].indexOf(false)] = true;
                    }
                    break;
                case 15:
                    for (let index = 0; index < value; index++) {
                        !player.doors[15].includes(false) ? setPoints(15) : player.doors[15][player.doors[15].indexOf(false)] = true;
                    }
                    break;
                case 25:
                    for (let index = 0; index < value; index++) {
                        !player.doors[25].includes(false) ? setPoints(25) : player.doors[25][player.doors[25].indexOf(false)] = true;
                    }
                    break;
            }

            if(player.volleys[player.volleys.length - 1][0] === "") {
                player.volleys[player.volleys.length - 1][0] = currentPointValue;
            } else if(player.volleys[player.volleys.length - 1][1] === "") {
                player.volleys[player.volleys.length - 1][1] = currentPointValue;
            } else if(player.volleys[player.volleys.length - 1][2] === "") {
                player.volleys[player.volleys.length - 1][2] = currentPointValue;
                setTimeout(() => {
                    player.isActive = false;
                    players.value.indexOf(player) + 1 === players.value.length ? players.value[0].isActive = true : players.value[players.value.indexOf(player) + 1].isActive = true;
                    activePlayerPointsVolley = false;
                }, 750);
            } else {
                player.volleys.push([currentPointValue, '', '']);
            }
        }
    });
    reset();
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
                <div class="points zero" :class="{'isDisable': double || triple}">0</div>
                <div class="specific">
                    <div class="points double" :class="{'isActive': double && !triple}" @click.prevent="selectDouble">DOUBLE</div>
                    <div class="points triple" :class="{'isActive': triple && !double}" @click.prevent="selectTriple">TRIPLE</div>
                    <div class="points back">RETOUR</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/mixins/buttons.scss";

.points-container {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #F0F2EF;
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    --tw-shadow-colored: inset 0 -5px 0 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow);

    .points-content {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        max-width: 390px;
        width: 100%;

        .points-line {
            display: flex;
            justify-content: space-between;
            // gap: 0.45rem;

            .points {
                aspect-ratio: 1/1;
                @include points();
            }
        }

        .instructions {
            display: flex;
            // justify-content: space-between;
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

</style>