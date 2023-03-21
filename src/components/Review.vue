<template>
    <article class="media">
        <figure class="media-left">
        </figure>
        <div class="media-content">
            <div class="content">
                <h1 class="rating-text"> 
                <i class="pi pi-star-fill" style="font-size: 2vh"></i>&ensp;{{ rating }} / 5
            </h1>
            <p>
                <strong>{{ title }}</strong> <small>&ensp;@{{ username }}</small>
                <br>
                {{ review }}
            </p>
            </div>
        </div>
    </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

//Defines the input for the spesific review
const props = defineProps({
  reviewInfo: { type: String },
})
const likeCounter = ref(0);
const username = ref();

let uid = props.reviewInfo.split(";")[0]

//Gets the title from the database.
let title = props.reviewInfo.split(";")[1]

//Gets the rating from the database.
let rating = props.reviewInfo.split(";")[2]

//Gets the review from the database.
let review = props.reviewInfo.split(";")[3]

onMounted(async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let usernameFromDB = docSnap.data().username
    username.value = usernameFromDB;
});
</script>

<style scoped>
.rating-text {
    position: absolute;
    left: 102vh;
    font-size: 2vh;
    font-weight: bold;
}
</style>