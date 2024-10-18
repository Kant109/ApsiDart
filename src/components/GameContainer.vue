<script setup lang="ts">

const props = defineProps<{
  img: string
  title: string
  routeName: string
}>()

</script>

<template>
    <div class="game-container">
        <div class="game-content">
            <img :src="'/src/assets/images/' + props.img + '.png'" alt="Image Game">
            <div class="game-text">
                <div class="game-name">{{ props.title }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.game-container {
    width: 100%;
    height: 8rem;
    position: relative;
    background-color: var(--bg-color-secondary);
    border-radius: 8px;

    .game-content {
        display: flex;
        align-items: center;
        height: 100%;
        
        img {
            width: 7rem;
            height: 7rem;
        }
        
        .game-text {
            padding: 1rem;
            height: 100%;

            .game-name {
                font-family: "Monoton", sans-serif;
                font-size: 1.5rem;
                color: var(--text-color);
            }
        }
    }

    &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("@/assets/images/right-arrow.svg");
    }
}

</style>