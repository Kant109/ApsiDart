<script setup lang="ts">
import { ref } from 'vue';

const double = ref(false);
const triple = ref(false);

const selectDouble = () => {
    if(triple.value) {
        triple.value = false;
    }
    double.value = !double.value;
}

const selectTriple = () => {
    if(double.value) {
        double.value = false;
    }
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
    --tw-shadow: inset 0 5px 0 0 rgba(0, 0, 0, .25);
    --tw-shadow-colored: inset 0 -5px 0 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow);

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
                aspect-ratio: 1/1;
                @include points();
            }
        }

        .instructions {
            display: flex;
            justify-content: space-between;
            margin-top: .5rem;
            gap: 0.45rem;

            .points {
                aspect-ratio: 1/1;
                @include points();
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