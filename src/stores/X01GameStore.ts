import { defineStore } from "pinia";
import { ref } from "vue";

export const useX01GameStore = defineStore('X01Game', () => {
    const players = ref([] as Array<X01Player>);
    const isGameFinish = ref(false);
    const isGameWinner = ref({} as X01Player);

    function setPlayer(player: X01Player) {
        players.value.push(player);
    }

    function setIsGameFinish(newIsGameFinish: boolean) {
        console.log('in set')
        isGameFinish.value = newIsGameFinish;
    }

    function setIsGameWinner(newIsGameWinner: X01Player) {
        isGameWinner.value = newIsGameWinner;
    }

    return { players, isGameFinish, isGameWinner, setPlayer, setIsGameFinish, setIsGameWinner };
})