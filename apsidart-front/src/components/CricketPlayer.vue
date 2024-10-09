<script setup lang="ts">
import { ref } from 'vue';

const isStatOpen = ref(false);
const bgColors = ['#f9cd61', '#694cf1', '#eb5851', '#aad5ff'];

const props = defineProps<{
  player?: string
  bgColor: number
  isTopBgActive: boolean
}>()

const topBgColor = (): string => {
    if(props.isTopBgActive) {
        if(props.bgColor - 1 < 0) {
            return bgColors[bgColors.length - 1];
        }
        return bgColors[props.bgColor - 1];
    }
    return 'transparent';
}

const openStat = () => {
    isStatOpen.value = !isStatOpen.value;
}

</script>

<template>
    <div class="full-content" :style="'background-color:' + topBgColor() + ';'">
        <div class="player-content" :style="'background-color:' + bgColors[bgColor] + ';'" @click.prevent="openStat">
            <div class="player-name">{{ player }}</div>
            <div class="doors">
                <div class="door"></div>
                <div class="door"></div>
                <div class="door"></div>
                <div class="door"></div>
                <div class="door"></div>
                <div class="door"></div>
                <div class="door"></div>
            </div>
            <div class="points-taken">540</div>
        </div>
        <div class="player-stats" :style="'background-color:' + bgColors[bgColor] + ';'" v-if="isStatOpen">
            COUCOU
        </div>
    </div>
</template>

<style lang="scss">
.player-content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: 60px;
    border-radius: 1rem 1rem 0 0;
    padding: 0 1rem;
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    --tw-shadow-colored: inset 0 -5px 0 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

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

    .doors {
        display: flex;
        align-items: center;
        gap: .5rem;
        grid-area: 1 / 2 / 2 / 5;

        .door {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid rgba(black, .5);
            border-radius: 50%;
            height: 1.5rem;
            width: 1.5rem;
        }
    }
}
</style>