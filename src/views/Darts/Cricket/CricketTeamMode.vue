<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';

const nbTeams = ref(2);

const router = useRouter();

const selectNbTeam = (nbTeamChoice: number) => {
    nbTeams.value = nbTeamChoice;
}

const back = () => {
    router.push({ name: "darts-mode-cricket" });
}

</script>

<template>
    <div class="cricket-team-mode">
        <Header title="CRICKET" @previous-route="back" />

        <div class="nb-team-container">
            <h3>Sélectionner le nombre d'équipes</h3>
            <div class="nb-team-choices">
                <div class="nb-team-choice" @click.prevent="selectNbTeam(2)">2</div>
                <div class="nb-team-choice" @click.prevent="selectNbTeam(3)">3</div>
                <div class="nb-team-choice" @click.prevent="selectNbTeam(4)">4</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/mixins.scss";

.cricket-team-mode {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;

    .nb-team-container {
        display: flex;
        flex-direction: column;
        width: 80%;
        align-items: center;

        h3 {
            font-family: "Tilt Warp", sans-serif;
            font-size: 1.5rem;
            color: var(--text-color);
            text-align: center;
        }

        .nb-team-choices {
            display: flex;
            justify-content: space-around;
            width: 100%;

            .nb-team-choice {
                @include btn-primary;
                & {
                    width: 60px;
                    margin: 0;
                }
            }
        }
    }

    .btn-cancel {
        @include btn-secondary;
        & {
            margin-top: 1rem;
        }
    }
}

</style>