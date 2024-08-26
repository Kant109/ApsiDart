<script setup lang="ts">
import User from "../assets/mock/user.json";

const seeRanking = () => {
    console.log('go to full ranking')
}
</script>

<template>
    <div class="ranking-container">
        <div class="header">
            <h2>Classement</h2>
            <select name="mode-type-ranking" id="mode-type-ranking">
                <option value="501">501</option>
                <option value="301">301</option>
                <option value="cricket">Cricket</option>
            </select>
        </div>
        
        <div class="ranking-content">
            <div class="podium">
                <div class="place second">{{ User.pseudo }}</div>
                <div class="place first">{{ User.pseudo }}</div>
                <div class="place third">{{ User.pseudo }}</div>
            </div>
            <div class="check-ranking">
                <a @click.prevent="seeRanking">classement<span class="arrow"></span></a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.ranking-container {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 2px rgba(0,0,0,0.5);
    padding: 1rem;

    .header {
        display: flex;
        justify-content: space-between;

        h2 {
            font-family: "Bungee Tint", sans-serif;
            margin: 0;
        }

        select {
            border: none;
            outline: none;
            background-color: transparent;
        }
    }

    .ranking-content {

        .podium {
            display: flex;
            justify-content: space-evenly;

            .place {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                font-family: "Kanit", sans-serif;
                margin-top: 1rem;

                &.second::before {
                    content: "";
                    display: block;
                    background-image: url("../assets/images/2nd-place-medal.svg");
                    background-repeat: no-repeat;
                    height: 2rem;
                    width: 2rem;
                    margin-top: 2rem;
                }

                &.first::before {
                    content: "";
                    display: block;
                    background-image: url("../assets/images/1st-place-medal.svg");
                    background-repeat: no-repeat;
                    height: 2rem;
                    width: 2rem;
                }

                &.third::before {
                    content: "";
                    display: block;
                    background-image: url("../assets/images/3rd-place-medal.svg");
                    background-repeat: no-repeat;
                    height: 2rem;
                    width: 2rem;
                    margin-top: 3rem;
                }
            }
        }

        .check-ranking {
            margin-top: 1rem;

            a {
                display: flex;
                font-family: "Kanit", sans-serif;
                font-size: 1rem;
                justify-content: flex-end;

                .arrow::after {
                    content: "";
                    display: block;
                    height: 1.5rem;
                    width: 1.5rem;
                    margin-left: .5rem;
                    background-image: url("../assets/images/right-arrow.svg");
                }
            }
        }
    }

}
</style>