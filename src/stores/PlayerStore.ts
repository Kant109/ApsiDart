import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore('Player', () => {
    const orderedPlayers = ref([] as Array<Player>);

    function setOrderedPlayers(newOrderedPlayers: Array<Player>) {
        orderedPlayers.value = newOrderedPlayers;
    }

    return { orderedPlayers, setOrderedPlayers };
})