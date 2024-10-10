<script setup lang="ts">
import { ref } from 'vue';
import CricketBoard from '@/components/CricketBoard.vue';
import CricketPlayer from '@/components/CricketPlayer.vue';

const Kant1: Player = {
    "id": "1",
    "pseudo": "Kant1",
    "isActive": false,
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
};

const Mati: Player = {
    "id": "2",
    "pseudo": "Mati",
    "isActive": false,
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
};

const Rom1: Player = {
    "id": "3",
    "pseudo": "Rom1",
    "isActive": true,
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
};

const Phil: Player = {
    "id": "4",
    "pseudo": "Phil",
    "isActive": false,
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
};

const Zim: Player = {
    "id": "5",
    "pseudo": "Zim",
    "isActive": false,
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
};

const players = ref([Kant1, Mati, Rom1, Phil, Zim]);
</script>

<template>
    <div class="title">CRICKET</div>
    <div class="points-recap">
        <div class="doors">
            <div class="door">20</div>
            <div class="door">19</div>
            <div class="door">18</div>
            <div class="door">17</div>
            <div class="door">16</div>
            <div class="door">15</div>
            <div class="door">25</div>
        </div>
    </div>
    <div class="players-container">
        <div class="players-content">
                <CricketPlayer
                    v-for="player in players"
                    :player="player"
                    :is-top-bg-active="players.indexOf(player) !== 0"
                    :is-top-bg-player-active="players[players.indexOf(player) - 1 > 0 ? players.indexOf(player) - 1 : 0].isActive === true"
                />
        </div>
    </div>
    <CricketBoard />
</template>

<style lang="scss">
.title {
    display: flex;
    justify-content: center;
    font-family: "Monoton", sans-serif;
    font-size: 3.25rem;
    padding: 2rem;
    color: #F0F2EF;
}

.points-recap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 390px;
    margin-bottom: 1rem;
    
    .doors {
        display: flex;
        gap: .5rem;
        font-family: "Tilt Warp", sans-serif;
        font-size: 1rem;

        .door {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            background-color: #F0F2EF;
            width: 1.5rem;
            aspect-ratio: 1/1;
        }
    }
}

.players-container {
    display: flex;
    justify-content: center;
    width: 100%;

    .players-content {
        display: flex;
        flex-direction: column;
        max-width: 390px;
        width: 100%;
    }
}
</style>