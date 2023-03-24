<template>
    <div class="review">
        <div class="card">
            <figure class="media-left">
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ title }}</strong> <small>&ensp;@{{ username }}</small>
                        <br>
                        {{ review }}
                        <br>
                        <i class="pi pi-star-fill" style="font-size: 2vh"></i>&ensp;{{ rating }} / 5
                    </p>
                    
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>

import { ref, onMounted } from 'vue'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { userStore } from '../stores/UsersStore'

const store = userStore();

//Defines the input for the spesific review
const props = defineProps({
  reviewInfo: { type: String },
})

const username = ref();
const type = ref();

let uid = props.reviewInfo.split(";")[0]

//Gets the title from the database.
let title = props.reviewInfo.split(";")[1]

//Gets the review from the database.
let review = props.reviewInfo.split(";")[3]

//Gets the rating from the database.
let rating = props.reviewInfo.split(";")[2]

onMounted(async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    let usernameFromDB = docSnap.data().username
    username.value = usernameFromDB;

    if (store.uid !== "no user") {
            
        const docRef = await doc(db, "users", store.uid);
        const docSnap = await getDoc(docRef);
        let userType = docSnap.data().type;
        type.value = userType;
    }
});

</script>

<style scoped>
.rating-text {
    position: absolute;
    left: 102vh;
    font-size: 2vh;
    font-weight: bold;
}

.delete-icon {
    position: absolute;
}

.content {
    padding-left: 1vh;
}

.card {
    background-color: antiquewhite;
}

</style>