import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('Game', () => {
    const players = ref([] as Array<Player>);
    function setPlayer(player: Player) {
        players.value.push(player);
    }

    return { players, setPlayer };
})