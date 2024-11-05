<script setup lang="ts">

</script>

<template>
    <div class="darts-game-container">
        <div class="header">
            <div class="title">DARTS</div>
        </div>

        <div class="darts-game-chose-mode">
            <div class="darts-animation">
                <img src="/icons/darts.png" alt="Image Game">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/variables.scss";

.darts-game-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    .header {
        width: 100%;
        padding: 1rem .5rem;
        background-color: var(--bg-color-primary);

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 2rem;
            color: var(--text-color);
        }
    }

    .darts-game-chose-mode {
        display: flex;
        margin-top: 2rem;

        .darts-animation {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-color-secondary);
            border-radius: .5rem;
            width: 9rem;
            height: 9rem;

            img {
                width: 9rem;
                height: 9rem;
            }
        }
    }
}

</style>