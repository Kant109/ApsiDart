import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('Game', () => {
    const players = ref(
        [
            {
                "id": 1,
                "pseudo": "Kant1",
                "points": {
                    "20": 0,
                    "19": 0,
                    "18": 0,
                    "17": 0,
                    "16": 0,
                    "15": 0,
                    "25": 0,
                    "total": 0
                },
                "doors": {
                    "20": [false, false, false],
                    "19": [false, false, false],
                    "18": [false, false, false],
                    "17": [false, false, false],
                    "16": [false, false, false],
                    "15": [false, false, false],
                    "25": [false, false, false]
                },
                "volleys": []
            },
            {
                "id": 2,
                "pseudo": "Mati",
                "points": {
                    "20": 0,
                    "19": 0,
                    "18": 0,
                    "17": 0,
                    "16": 0,
                    "15": 0,
                    "25": 0,
                    "total": 0
                },
                "doors": {
                    "20": [false, false, false],
                    "19": [false, false, false],
                    "18": [false, false, false],
                    "17": [false, false, false],
                    "16": [false, false, false],
                    "15": [false, false, false],
                    "25": [false, false, false]
                },
                "volleys": []
            },
            {
                "id": 3,
                "pseudo": "ROM1",
                "points": {
                    "20": 0,
                    "19": 0,
                    "18": 0,
                    "17": 0,
                    "16": 0,
                    "15": 0,
                    "25": 0,
                    "total": 0
                },
                "doors": {
                    "20": [false, false, false],
                    "19": [false, false, false],
                    "18": [false, false, false],
                    "17": [false, false, false],
                    "16": [false, false, false],
                    "15": [false, false, false],
                    "25": [false, false, false]
                },
                "volleys": []
            },
            {
                "id": 4,
                "pseudo": "PHILO",
                "points": {
                    "20": 0,
                    "19": 0,
                    "18": 0,
                    "17": 0,
                    "16": 0,
                    "15": 0,
                    "25": 0,
                    "total": 0
                },
                "doors": {
                    "20": [false, false, false],
                    "19": [false, false, false],
                    "18": [false, false, false],
                    "17": [false, false, false],
                    "16": [false, false, false],
                    "15": [false, false, false],
                    "25": [false, false, false]
                },
                "volleys": []
            },
            {
                "id": 5,
                "pseudo": "ZIM",
                "points": {
                    "20": 0,
                    "19": 0,
                    "18": 0,
                    "17": 0,
                    "16": 0,
                    "15": 0,
                    "25": 0,
                    "total": 0
                },
                "doors": {
                    "20": [false, false, false],
                    "19": [false, false, false],
                    "18": [false, false, false],
                    "17": [false, false, false],
                    "16": [false, false, false],
                    "15": [false, false, false],
                    "25": [false, false, false]
                },
                "volleys": []
            }
        ]
    ) as unknown as Array<Player>
})