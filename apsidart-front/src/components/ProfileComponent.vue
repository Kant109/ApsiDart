<script setup lang="ts">
import { ref } from "vue";
import User from "../assets/mock/user.json";

const seeMore = ref(false);

const seeProfile = () => {
    seeMore.value = !seeMore.value;
}

const saveUser = () => {
    console.log('in save');
}
</script>

<template>
    <div class="profile-container">
        <div class="see-more">
            <img src="../assets/images/see-more.svg" alt="Voir plus" @click.prevent="seeProfile">
        </div>
        <div class="profile-infos-container">
            <div class="profile-picture">
                <img src="../assets/mock/user-picture.svg" alt="Photo de profil">
            </div>
            <div class="profile-infos">
                <div class="name">{{ User.name }}</div>
                <div class="firstname">{{ User.firstname }}</div>
                <div class="ratio">Ratio (V/D) : &nbsp;<div class="value">{{ User.win }}/{{ User.loose }}</div></div>
                <div class="rank">Classement : &nbsp;<span class="value">{{ User.rank }}<sup>ème</sup></span></div>
            </div>
        </div>
    </div>
    <div class="user-profile-container" v-if="seeMore">
        <div class="user-profile-box">
            <div class="cancel" @click.prevent="seeProfile">
                <img src="../assets/images/close-cross.svg" alt="Fermer">
            </div>
            <div class="user-picture">
                <img src="../assets/mock/user-picture.svg" alt="Photo de profil">
            </div>
            <div class="input name">
                <label for="name">Nom</label>
                <input type="text" id="name" name="name" v-model="User.name"/>
            </div>
            <div class="input firstname">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" v-model="User.firstname"/>
            </div>
            <div class="input birthdate">
                <label for="birthdate">Date de naissance</label>
                <input type="text" id="birthdate" name="birthdate" v-model="User.birthdate"/>
            </div>
            <div class="input mail">
                <label for="mail">Email</label>
                <input type="text" id="mail" name="mail" v-model="User.mail"/>
            </div>
            <div class="save">
                <a @click.prevent="saveUser">Sauvegarder</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../assets/mixins/buttons.scss";

.profile-container {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1rem;
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
        gap: 1rem;
        align-items: center;

        .profile-picture {
            display: flex;
            justify-content: center;
            align-items: center;
            
            img {
                width: 6rem;
                height: 6rem;
                aspect-ratio: 1/1;
                background-color: lightgrey;
                border-radius: 50%;
            }

        }

        .profile-infos {
            display: flex;
            flex-direction: column;

            .name {
                font-family: "Bungee Tint", sans-serif;
                font-size: 1.5rem;
            }
            .firstname {
                font-family: "Kanit", sans-serif;
                font-size: 1.5rem;
            }
            
            .ratio, .rank {
                display: flex;
                align-items: center;
                font-family: "Kanit", sans-serif;

                .value {
                    font-family: "Bungee Tint", sans-serif;
                }

                sup {
                    font-family: "Kanit", sans-serif;
                }
            }
        }
    }
}

.user-profile-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(161, 161, 161, 0.25);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    z-index: 1000;

    .user-profile-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin: 1rem;
        padding: 2rem 0;
        border-radius: 10px;
        box-shadow: 0px 0px 50px 2px rgba(0,0,0,0.5);
        position: relative;
        background-color: white;
        height: fit-content;
    
        .cancel {
            position: absolute;
            top: 1rem;
            right: 1rem;
    
            img {
                width: 1.5rem;
            }
        }
    
        .user-picture {
            display: flex;
            justify-content: center;
            align-items: center;
    
            img {
                width: 7rem;
                height: 7rem;
                aspect-ratio: 1/1;
                border-radius: 50%;
                background-color: lightgrey;
            }
    
        }
    
        .input {
            display: flex;
            flex-direction: column;
            position: relative;
            border: 1px solid lightgrey;
            border-radius: 5px;
            height: 3rem;
            max-width: 80%;
    
            label {
                position: absolute;
                top: -.7rem;
                background-color: white;
                margin-left: .5rem;
                text-align: center;
                font-family: "Kanit", sans-serif;
                font-size: 1rem;
            }
    
            input {
                border: none;
                font-family: "Kanit", sans-serif;
                font-size: 1.5rem;
                height: 100%;
                padding: .5rem;
                margin: 0 .5rem;
                outline: none;
            }
    
            &:focus {
                border: 1px solid black;
            }
        }
    
        .save {
            @include button-primary(#c90900);
        }
    }
}
</style>