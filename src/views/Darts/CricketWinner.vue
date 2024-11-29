<script setup lang="ts">

const back = () => {

}

const replay = () => {

}

</script>

<template>
    <div class="winning-container">
        <div class="winner-content">
            <img src="@/assets/images/chevron.svg" alt="Retour" @click.prevent="back">
            <div class="player-img"></div>
            <div class="player-info">
                <div class="player-info-pseudo">Mati</div>
                <div class="player-info-full-name">CHARRIER Matis</div>
            </div>
        </div>
        <div class="player-stats"></div>
        <div class="btn-replay" @click.prevent="replay">Rejouer</div>
    </div>
</template>

<style lang="scss" scoped>

.winning-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .winner-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50vh;
        position: relative;

        img {
            position: absolute;
            left: 0;
            top: 1rem;
            transform: rotate(180deg);
            width: 1.5rem;
            height: 1.5rem;
            margin-left: .5rem;
        }

        .player-img {
            height: 7rem;
            width: 7rem;
            border-radius: 50%;
            background-color: white;
            cursor: pointer;
        }

        .player-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            &-pseudo {
                font-family: "Tilt Warp", sans-serif;
                font-size: 1.5rem;
                color: var(--text-color);
                text-align: center;
                margin-top: 1rem;
            }

            &-full-name {
                display: flex;
                font-family: "Tilt Warp", sans-serif;
                font-size: 1rem;
                color: var(--text-color);
                text-align: center;
                margin-top: .5rem;
            }
        }
    }
}
</style>