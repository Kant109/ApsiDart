<script setup lang="ts">
import { ref } from 'vue';

const double = ref(false);
const triple = ref(false);

const selectDouble = () => {
    double.value = !double.value;
}

const selectTriple = () => {
    triple.value = !triple.value;
}

const reset = () => {
    double.value = false;
    triple.value = false;
}

</script>

<template>
    <div class="points-container">
        <div class="points-content">
            <div class="points-line">
                <div class="points" @click.prevent="reset">20</div>
                <div class="points" @click.prevent="reset">19</div>
                <div class="points" @click.prevent="reset">18</div>
                <div class="points" @click.prevent="reset">17</div>
                <div class="points" @click.prevent="reset">16</div>
                <div class="points" @click.prevent="reset">15</div>
                <div class="points" :class="{'isDisable': triple}" @click.prevent="reset">25</div>
            </div>
            <div class="instructions">
                <div class="points zero" :class="{'isDisable': double || triple}">0</div>
                <div class="specific">
                    <div class="points double" :class="{'isActive': double && !triple}" @click.prevent="selectDouble">DOUBLE</div>
                    <div class="points triple" :class="{'isActive': triple && !double}" @click.prevent="selectTriple">TRIPLE</div>
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

                        &.isActive {
                            color: rgba(black, .25);
                            box-shadow: none;
                        }
                    }
                }
            }
        }
    }
}

</style>