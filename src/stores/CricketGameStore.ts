import { defineStore } from "pinia";
import { ref } from "vue";

export const useCricketGameStore = defineStore('CricketGame', () => {
    const players = ref([] as Array<CricketPlayer>);
    const isGameFinish = ref(false);
    const isGameWinner = ref({} as CricketPlayer);

    function setPlayer(player: CricketPlayer) {
        players.value.push(player);
    }

    function setIsGameFinish(newIsGameFinish: boolean) {
        isGameFinish.value = newIsGameFinish;
    }

    function setIsGameWinner(newIsGameWinner: CricketPlayer) {
        isGameWinner.value = newIsGameWinner;
    }

    return { players, isGameFinish, isGameWinner, setPlayer, setIsGameFinish, setIsGameWinner };
})