<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useManagementAppStore } from '@/stores/ManagementAppStore';
import GameContainer from '@/components/GameContainer.vue';

const managementAppStore = useManagementAppStore();

const router = useRouter();

const isDarkMode = computed(() => managementAppStore.isDarkMode);

const goToProfile = () => {
    router.push({ name: "profile"});
}

const setDarkMode = () => {
    managementAppStore.isDarkMode = !isDarkMode.value;
    localStorage.setItem('darkmode-apsidart', managementAppStore.isDarkMode ? 'active' : 'disable');
}
</script>

<template>
    <div class="header">
        <div class="profile" @click.prevent="goToProfile"></div>
        <div class="title">GEORGE</div>
        <div class="dark-mode" @click.prevent="setDarkMode">
            <input id="toggle" class="toggle" :class="{'darkmode': isDarkMode}" type="checkbox">
        </div>
    </div>
    <div class="all-games-container">
        <GameContainer
            img="darts"
            title="Fléchettes"
            route-name="darts"
        />
        <GameContainer
            img="darts"
            title="Fléchettes"
            route-name="darts"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/helpers/variables.scss";

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem .5rem;
    background-color: var(--bg-color-primary);

    .profile {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background-color: white;
    }

    .title {
        display: flex;
        justify-content: center;
        font-family: "Monoton", sans-serif;
        font-size: 2rem;
        color: var(--text-color);
    }

    .dark-mode {
        // magic
        .toggle {
            --size: 1.5rem;
            
            appearance: none;
            outline: none;
            cursor: pointer;
            
            width: var(--size);
            height: var(--size);
            
            --ray-size: calc(var(--size) * -0.4);
            --offset-orthogonal: calc(var(--size) * 0.65);
            --offset-diagonal: calc(var(--size) * 0.45);

            color: hsl(40, 100%, 50%);
            border-radius: 999px;
            box-shadow: 
            inset 0 0 0 var(--size),
            calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
            var(--offset-orthogonal) 0 0 var(--ray-size),
            0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
            0 var(--offset-orthogonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
            var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
            var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
            ;
            
            transition: all 500ms;
            
            &.darkmode {
                transform: scale(1.35);

                box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
                color: hsl(240, 100%, 95%);
            }
        }
    }
}

.all-games-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 0 .5rem;
}
</style>