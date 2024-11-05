<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isAnimation = ref(false);

onMounted(() => {
    isAnimation.value = true;
})
</script>

<template>
    <div class="darts-game-container">
        <div class="header">
            <div class="title">DARTS</div>
        </div>

        <div class="darts-img" :class="{'animation': isAnimation}">
            <img src="/icons/darts.png" alt="Image Game">
        </div>

        <div class="darts-game-chose-mode">
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
        animation-duration: .5s;
        animation-name: appear;

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 2rem;
            color: var(--text-color);
            background-color: red;
        }
    }

    .darts-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--bg-color-secondary);
        border-radius: .5rem;
        width: 9rem;
        height: 9rem;
        
        &.animation {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }

        img {
            width: 9rem;
            height: 9rem;
        }
    }

    .darts-game-chose-mode {
        display: flex;
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
    100% {
        opacity: 1;
    }
}

</style>