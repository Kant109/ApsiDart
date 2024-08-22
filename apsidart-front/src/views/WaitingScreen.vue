<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue";
import DartsAnimation from "../assets/animations/darts.json";
</script>

<template>
    <div class="waiting-container">

        <LottieAnimation 
            :animation-data="DartsAnimation"
            :auto-play="true"
            :loop="true"
            :speed="1"
            ref="anim"
        />

    </div>
</template>

<style lang="scss">
.waiting-container {
    display: flex;
    height: 100%;
}
</style>