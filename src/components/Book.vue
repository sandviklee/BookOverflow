<template>
    <div>
        <div class="card">
            <router-link :to="'/book/' + id">
                <img class="bookImg" :src="path">
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

//Defines the input for the spesific book, what kind of book should it be?
const props = defineProps({
  bookInfo: { type: String },
})
const path = ref()
//Gets the id from the database.
let id = props.bookInfo.split(";")[1]

//Async function to determine the path of the books. This is only for local files!
watchEffect(async () => {
    path.value = props.bookInfo.split(";")[0]
})

</script>

<style>   
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
}
</style>