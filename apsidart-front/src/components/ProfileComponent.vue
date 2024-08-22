<script setup lang="ts">
import User from "../assets/mock/user.json";
</script>

<template>
    <div class="profile-container">
        <div class="see-more">
            <img src="../assets/images/see-more.svg" alt="Voir plus">
        </div>
        <div class="profile-infos-container">
            <div class="profile-picture">
                <img src="../assets/mock/user-picture.svg" alt="Photo de profil">
            </div>
            <div class="profile-infos">
                <div class="name">{{ User.name }}</div>
                <div class="firstname">{{ User.firstname }}</div>
                <div class="ratio">{{ User.ratio }}</div>
                <div class="rank">{{ User.rank }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.profile-container {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 2px rgba(0,0,0,0.5);
    position: relative;

    .see-more {
        position: absolute;
        top: .5rem;
        right: .5rem;

        img {
            width: 1.5rem;
        }
    }

    .profile-infos-container {
        display: flex;
        margin: 1rem;
        gap: .5rem;

        .profile-picture {
            display: flex;
            background-color: red;
            border-radius: 50%;
            width: 5rem;
            aspect-ratio: 1/1;
            justify-content: center;
            align-items: center;

            img {
                width: 4rem;
                aspect-ratio: 1/1;
            }

        }

        .profile-infos {
            .name {
                font-family: "Bungee Tint", sans-serif;
            }
            .firstname {
                font-family: "Kanit", sans-serif;
            }
        }
    }
}
</style>