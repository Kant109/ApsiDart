<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isSlideTopAnimation = ref(false);

onMounted(() => {
    isSlideTopAnimation.value = true;
    setTimeout(() => {
        isSlideTopAnimation.value = false;
    }, 500);
})
</script>

<template>
    <div class="darts-game-container">
        <div class="header">
            <div class="title">DARTS</div>
        </div>

        <div class="darts-img" :class="{'slide-top-animation': isSlideTopAnimation}">
            <img src="/icons/darts.png" alt="Image Game">
        </div>

        <div class="darts-game-chose-mode">
            <div class="choices-container">
                <div class="choice">Cricket</div>
                <div class="choice">X01</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/variables.scss";

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
        animation: appear .5s;

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 3rem;
            color: var(--text-color);
        }
    }

    .darts-img {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-color-secondary);
        border-radius: .5rem;
        width: 9rem;
        height: 9rem;
        margin-top: 1rem;
        
        &.slide-top-animation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }

        img {
            width: 9rem;
            height: 9rem;
        }
    }

    .darts-game-chose-mode {
        display: flex;
        width: 100%;
        animation: appear 1.25s;
        margin: 3rem 0;

        .choices-container {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;

            .choice {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--bg-color-secondary);
                height: 60px;
                width: 130px;
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
}

@keyframes slide-top {
  0% {
    transform: translateY(0) translate(-50%, -50%);
  }
  100% {
    transform: translateY(calc( -1 * calc(50vh - (82px + 4.5rem)))) translate(-50%, -50%);
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