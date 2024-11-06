<script setup lang="ts">

</script>

<template>
    <div class="crickets-settings-container">
        <div class="header">
            <div class="title">CRICKET</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.crickets-settings-container {
    display: flex;
    width: 100%;
    height: 100%;
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
            font-size: 3rem;
            color: var(--text-color);
        }
    }
}

</style>