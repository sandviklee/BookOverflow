<template>
    <div>
        <div class="card">
            <router-link :to="'/book/' + id">
                <img class="bookImg" :src="imageURL">
                <div class="hide-reviews">
                    <h1><i class="pi pi-star-fill" style="font-size: 1.5rem"></i></h1> 
                    <h1>{{ bookRating }}</h1>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

// The different properties a book can have
const props = defineProps([
  'title','authors','imageURL','id','avgRating','blurb'
])

// Defaults when parent didn't pass field
const title = ref('NO TITLE')
const authors = ref('NO AUTHORS')
const imageURL = ref('https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png')
const id = ref(0)
const avgRating = ref(0)
const blurb = ref('')

</script>

<style>   
.hide-reviews {
    display: none;
    position: absolute;
    font-size: larger;
    font-weight: 900;
    text-shadow: 2px 2px 0px black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
}

.bookImg:hover + .hide-reviews {
    display: block;
    color: yellow;
    pointer-events: none;
}

.card {
    position: relative;
    text-align: center;
}

.bookImg {    
    border-radius: 5px;
    height: 20vh;
    width: 14vh;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 2px 0px 0px #E98074;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    
}

.bookImg:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    filter: blur(1px);
}
</style>