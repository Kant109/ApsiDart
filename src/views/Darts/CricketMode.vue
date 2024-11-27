<script setup lang="ts">
import { computed } from 'vue';
import { useCricketGameStore } from '@/stores/CricketGameStore';
import { useRouter } from 'vue-router';

const cricketGameStore = useCricketGameStore();

const orderedPlayers = computed(() => JSON.parse(localStorage.getItem('orderedDartsPlayer') as string));

const router = useRouter();

const selectCricketMode = (selectedCricketMode: string) => {
    if(selectedCricketMode === 'simple') {
        orderedPlayers.value.forEach((player: Player) => {
            const currentPlayer: CricketPlayer = {
                id: player.id,
                pseudo: player.pseudo,
                isActive: player.order === "1",
                points: {
                    20: 0,
                    19: 0,
                    18: 0,
                    17: 0,
                    16: 0,
                    15: 0,
                    25: 0,
                    total: 0
                },
                doors: {
                    20: 0,
                    19: 0,
                    18: 0,
                    17: 0,
                    16: 0,
                    15: 0,
                    25: 0
                },
                volleys: player.order === "1" ? [['', '', '']] : []
            };

        cricketGameStore.setPlayer(currentPlayer);
        });
        router.push({ name: "cricket-game" })
    } else if(selectedCricketMode === 'team') {
        router.push({ name: "cricket-team-mode" })
    }
}

const back = () => {
    router.push({ name: "darts-mode" });
}

</script>

<template>
    <div class="cricket-mode-container">
        <div class="header">
            <img src="@/assets/images/chevron.svg" alt="Retour" @click.prevent="back">
            <div class="title">CRICKET</div>
        </div>

        <div class="cricket-choice-container">
            <div class="btn-simple-mode" @click.prevent="selectCricketMode('simple')">Simple</div>
            <div class="btn-team-mode" @click.prevent="selectCricketMode('team')">Équipe</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

.cricket-mode-container {
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

    .cricket-choice-container {
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