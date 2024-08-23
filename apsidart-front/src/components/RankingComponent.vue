<script setup lang="ts">

const seeRanking = () => {
    console.log('go to full ranking')
}
</script>

<template>
    <div class="ranking-container">
        <div class="header">
            <h2>Classement</h2>
            <select name="mode-type" id="mode-type">
                <option value="501">501</option>
                <option value="301">301</option>
                <option value="cricket">Cricket</option>
            </select>
        </div>
        
        <div class="ranking-player">

            <div class="podium">
                <div class="second-place"></div>
                <div class="first-place"></div>
                <div class="third-place"></div>
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
        }
    }

    .ranking-player {

        .podium {

        }

        .check-ranking {

            a {
                font-family: "Kanit", sans-serif;

                .arrow {
                    content: "";
                    background-image: url("../assets/images/right-arrow.svg");;
                }
            }
        }
    }

}
</style>