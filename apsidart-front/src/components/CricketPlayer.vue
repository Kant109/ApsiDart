<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  player: Player
  isTopBgActive: boolean
  isTopBgPlayerActive: boolean
}>()

const isStatOpen = ref(props.player.isActive);

const openStat = () => {
    isStatOpen.value = !isStatOpen.value;
}

</script>

<template>
    <div class="full-content" :class="{'top-bg': props.isTopBgActive, 'top-bg-active': isTopBgPlayerActive}">
        <div class="player-content" :class="{'isPlayerActive': player.isActive}" @click.prevent="openStat">
            <div class="player-name">{{ player.pseudo }}</div>
            <div class="recap">
                <div class="doors">
                    <div class="door" :class="{'first': true, 'second': true, 'full': false}"></div>
                    <div class="door"></div>
                    <div class="door"></div>
                    <div class="door"></div>
                    <div class="door"></div>
                    <div class="door"></div>
                    <div class="door"></div>
                </div>
            </div>
            <div class="points-taken">{{ player.points.total }}</div>
        </div>
        <div class="player-stats" :class="{'isPlayerActive': player.isActive}" v-if="isStatOpen">
            <div class="current-points">
                <div class="points"></div>
                <div class="points"></div>
                <div class="points"></div>
            </div>
            <div class="points-recap">
                <div class="doors">
                    <div class="door">20</div>
                    <div class="door">19</div>
                    <div class="door">18</div>
                    <div class="door">17</div>
                    <div class="door">16</div>
                    <div class="door">15</div>
                    <div class="door">25</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.top-bg {
    background-color: #F0F2EF;
}

.top-bg-active {
    background-color: #f9cd61;
}

.player-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 60px;
    background-color: #F0F2EF;
    border-radius: 1rem 1rem 0 0;
    padding: 0 1rem;
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    --tw-shadow-colored: inset 0 -5px 0 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

    &.isPlayerActive {
        background-color: #f9cd61;
    }

    .player-name, .points-taken {
        display: flex;
        align-items: center;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;
        color: rgba(black, .75);

        &:is(.player-name) {
            min-width: 55px;
            grid-area: 1 / 1 / 2 / 2;
        }

        &:is(.points-taken) {
            justify-content: flex-end;
            grid-area: 1 / 5 / 2 / 6;
        }
    }

    .recap {
        display: flex;
        justify-content: center;
        flex-direction: column;
        grid-area: 1 / 2 / 2 / 5;
        gap: .5rem;
        padding-top: 5px;

        .doors {
            display: flex;
            align-items: center;
            gap: .5rem;
            
            .door {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 2px solid rgba(black, .75);
                border-radius: 50%;
                height: 1.5rem;
                width: 1.5rem;
                position: relative;

                &::before, &::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    background-color: rgba(black, .75);
                    height: 2px;
                }

                &::before {
                    transform: rotate(45deg);
                }
                &::after {
                    transform: rotate(-45deg);
                }
            }
        }
    }
}

.player-stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    background-color: #F0F2EF;

    &.isPlayerActive {
        background-color: #f9cd61;
    }

    .current-points {
        display: flex;
        justify-content: center;
        gap: 2rem;

        .points {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            width: 2rem;
            aspect-ratio: 1/1;
            background-color: #F0F2EF;
            border: 1px solid rgba(0, 0, 0, .25);
            --tw-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, .25);
            --tw-shadow-colored: inset 0 -5px 0 0 var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        }
    }

    .points-recap .doors .door {
        border: 1px solid rgba(0, 0, 0, .25);
    }
}
</style>