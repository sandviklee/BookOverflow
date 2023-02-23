<template>
    <div>
        <div class="card">
            <img class="bookImg" :src="logo">
        </div>
    </div>
</template>


<script setup>
import { ref, watchEffect } from 'vue'

//Defines the input for the spesific book, what kind of book should it be?
const props = defineProps({
  imagePath: { type: String },
})

const logo = ref()
watchEffect(async () => {
  logo.value = (await import(/* @vite-ignore */ `../assets/Bookformat/Author/${props.imagePath}`)).default
})

</script>

<style>   

.bookImg {
    box-shadow: 2px 0px 0px #E98074;
    border-radius: 5px;
    height: 20vh;
    width: 14vh;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
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