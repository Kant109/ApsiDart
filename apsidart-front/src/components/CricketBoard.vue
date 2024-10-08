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
                <div class="specific">
                    <div class="points double">DOUBLE</div>
                    <div class="points triple">TRIPLE</div>
                    <div class="points back">RETOUR</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/mixins/buttons.scss";

.points-container {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #F0F2EF;

    .points-content {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        max-width: 390px;

        .points-line {
            display: flex;
            justify-content: space-between;
            gap: 0.45rem;

            .points {
                @include points();
                aspect-ratio: 1/1;
            }
        }

        .instructions {
            display: flex;
            justify-content: space-between;
            margin-top: .5rem;
            gap: 0.45rem;

            .points {
                @include points();
                aspect-ratio: 1/1;
            }

            .specific {
                display: flex;
                flex-direction: row;
                width: 100%;
                gap: 0.45rem;

                .points{
                    &.double, &.triple, &.back {
                        width: 100%;
                        padding: 0 .5rem 5px 0.5rem;
                    }
                }
            }
        }
    }
}

</style>