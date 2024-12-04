import { defineStore } from "pinia";
import { ref } from "vue";

export const useCricketGameStore = defineStore('CricketGame', () => {
    const players = ref([] as Array<CricketPlayer>);
    const isGameFinish = ref(false);
    const winnerPlayer = ref({} as CricketPlayer);

    function setPlayer(player: CricketPlayer) {
        players.value.push(player);
    }

    function setIsGameFinish(newIsGameFinish: boolean) {
        isGameFinish.value = newIsGameFinish;
    }

    function setWinner(winner: CricketPlayer) {
        winnerPlayer.value = winner;
    }

    function reset() {
        players.value = [];
        isGameFinish.value = false;
    }

    return { players, isGameFinish, winnerPlayer, setPlayer, setIsGameFinish, setWinner, reset };
})