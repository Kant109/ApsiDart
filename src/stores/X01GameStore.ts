import { defineStore } from "pinia";
import { ref } from "vue";

export const useX01GameStore = defineStore('X01Game', () => {
    const players = ref([] as Array<X01Player>);
    const isGameFinish = ref(false);
    const winnerPlayer = ref({} as X01Player);

    function setPlayer(player: X01Player) {
        players.value.push(player);
    }

    function setIsGameFinish(newIsGameFinish: boolean) {
        isGameFinish.value = newIsGameFinish;
    }

    function setWinner(winner: X01Player) {
        winnerPlayer.value = winner;
    }

    function reset() {
        players.value = [];
        isGameFinish.value = false;
    }

    return { players, isGameFinish, winnerPlayer, setPlayer, setIsGameFinish, setWinner, reset };
})