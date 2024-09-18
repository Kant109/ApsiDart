<script setup lang="ts">

</script>

<template>
    <div class="points-container">
        <div class="points-content">
            <div class="points-line">
                <div class="points">20</div>
                <div class="points">19</div>
                <div class="points">18</div>
                <div class="points">17</div>
                <div class="points">16</div>
                <div class="points">15</div>
                <div class="points">25</div>
            </div>
            <div class="instructions">
                <div class="points zero">0</div>
                <div class="points line">LIGNE</div>
                <div class="points double">DOUBLE</div>
                <div class="points triple">TRIPLE</div>
                <div class="points back">RETOUR</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.points-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: inset 0px 4px 4px 0px rgba(0,0,0,0.5);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    .points-content {
        display: flex;
        flex-direction: column;
        padding: 1rem;

        .points-line {
            display: flex;
            justify-content: space-between;

            .points {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #FFEFBD;
                height: 45px;
                aspect-ratio: 1/1;
                border-radius: 8px;
                font-family: "Tilt Warp", sans-serif;
                font-size: 1rem;
                box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.5);
            }
        }

        .instructions {
            display: flex;
            justify-content: space-between;
            margin-top: 7px;

            .points {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #FFEFBD;
                height: 45px;
                border-radius: 8px;
                font-family: "Tilt Warp", sans-serif;
                font-size: 1rem;
                box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.5);

                &.zero {
                    width: 45px;
                }

                &.line, &.double, &.triple, &.back {
                    width: fit-content;
                    padding: 0 .5rem;
                }
            }
        }
    }
}

</style>