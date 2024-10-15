import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('Game', () => {
    const players = ref([] as Array<Player>);
    const isGameFinish = ref(false);
    const isGameWinner = ref({} as Player);

    function setPlayer(player: Player) {
        players.value.push(player);
    }

    function setIsGameFinish(newIsGameFinish: boolean) {
        console.log('in set')
        isGameFinish.value = newIsGameFinish;
    }

    function setIsGameWinner(newIsGameWinner: Player) {
        isGameWinner.value = newIsGameWinner;
    }

    return { players, isGameFinish, isGameWinner, setPlayer, setIsGameFinish, setIsGameWinner };
})