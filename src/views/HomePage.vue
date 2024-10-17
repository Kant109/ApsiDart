<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToProfile = () => {
    router.push({ name: "profile"});
}

</script>

<template>
    <div class="header">
        <div class="profile" @click.prevent="goToProfile"></div>
        <div class="title"></div>
        <div class="dark-mode">
            <input id="toggle" class="toggle" type="checkbox">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;

    .profile {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        background-color: white;
    }

    .dark-mode {
        // magic
        .toggle {
            --size: 2rem;
            
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
            
            &:checked {
                transform: scale(0.75);

                box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
                color: hsl(240, 100%, 95%);
            }
        }
    }
}
// https://pixelswap.fr/entry/building-a-dark-mode-theme-switcher-in-scss/
</style>