<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = ref('');

onMounted(() => {
    title.value = (route.params.mode as string).toUpperCase();
})

</script>

<template>
    <div class="x01-settings-container">
        <div class="header">
            <div class="title">{{ title }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.x01-settings-container {
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