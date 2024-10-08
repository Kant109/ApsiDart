<script setup lang="ts">
defineProps<{
  player?: string
}>()
</script>

<template>
    <div class="player-name">{{ player }}</div>
</template>

<style lang="scss">
.player-name {
    color: #F0F2EF;
}
</style>