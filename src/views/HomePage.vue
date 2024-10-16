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
            box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
            border-radius: 999px;
            color: hsl(240, 100%, 95%);
            
            transition: all 500ms;
            
            &:checked {
                --ray-size: calc(var(--size) * -0.4);
                --offset-orthogonal: calc(var(--size) * 0.65);
                --offset-diagonal: calc(var(--size) * 0.45);

                transform: scale(0.75);
                color: hsl(40, 100%, 50%);
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
            }
        }

        .toggle {
            z-index: 1;
            &:checked {
                
            }
        }
    }
}
</style>