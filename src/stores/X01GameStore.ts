import { defineStore } from "pinia";
import { ref } from "vue";

export const useX01GameStore = defineStore('X01Game', () => {
    const players = ref([] as Array<X01Player>);
    const isGameFinish = ref(false);

    function setPlayer(player: X01Player) {
        players.value.push(player);
    }

    function setIsGameFinish(newIsGameFinish: boolean) {
        isGameFinish.value = newIsGameFinish;
    }

    function reset() {
        players.value = [];
        isGameFinish.value = false;
    }

    return { players, isGameFinish, setPlayer, setIsGameFinish, reset };
})