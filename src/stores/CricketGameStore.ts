import { defineStore } from "pinia";
import { ref } from "vue";

export const useCricketGameStore = defineStore('CricketGame', () => {
    const players = ref([] as Array<CricketPlayer>);
    const playersPosition = ref([] as Array<CricketPlayer>);
    const isGameFinish = ref(false);
    const winnerPlayer = ref({} as CricketPlayer);
    const gameId = ref(0);
    const playersStats = ref({} as Stats);

    function reset() {
        players.value = [];
        playersPosition.value = [];
        isGameFinish.value = false;
        winnerPlayer.value = {} as CricketPlayer;
        gameId.value = 0;
        playersStats.value = {} as Stats;
    }

    return { players, playersPosition, isGameFinish, winnerPlayer, gameId, playersStats, reset };
})