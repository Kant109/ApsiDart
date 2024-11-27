<script setup lang="ts">
import { useX01GameStore } from '@/stores/X01GameStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const x01GameStore = useX01GameStore();

const orderedPlayers = computed(() => JSON.parse(localStorage.getItem('orderedDartsPlayer') as string));
const x01Mode = ref(0);

const router = useRouter();

const selectX01Mode = (selectedX01Mode: number) => {
    x01Mode.value = selectedX01Mode;

    orderedPlayers.value.forEach((player: Player) => {
        const currentPlayer: X01Player = {
            id: player.id,
            pseudo: player.pseudo,
            isActive: player.order === "1",
            points: x01Mode.value,
            volleys: player.order === "1" ? [['', '', '']] : []
        };

        x01GameStore.setPlayer(currentPlayer);
    });
    router.push({ name: "x01-game" })
}

const back = () => {
    router.push({ name: "darts-mode" });
}

</script>

<template>
    <div class="x01-mode-container">
        <div class="header">
            <img src="@/assets/images/chevron.svg" alt="Retour" @click.prevent="back">
            <div class="title">X01</div>
        </div>

        <div class="x01-choice-container">
            <div class="btn-simple-mode" @click.prevent="selectX01Mode(301)">301</div>
            <div class="btn-team-mode" @click.prevent="selectX01Mode(501)">501</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

.x01-mode-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1rem .5rem;
        background-color: var(--bg-color-primary);
        animation: appear .2s;

        img {
            position: absolute;
            left: 0;
            transform: rotate(180deg);
            width: 1rem;
            height: 1rem;
            margin-left: .5rem;
        }

        .title {
            display: flex;
            justify-content: center;
            font-family: "Monoton", sans-serif;
            font-size: 2rem;
            color: var(--text-color);
        }
    }

    .x01-choice-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        width: 80%;
        gap: 2rem;

        .choice, .btn-simple-mode, .btn-team-mode {
            @include btn-primary;
        }

        .btn-cancel {
            @include btn-secondary;
        }
    }
}

</style>