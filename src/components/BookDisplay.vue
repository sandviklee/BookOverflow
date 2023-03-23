<template>
    <div>
        <div class="review-1">
            <div class="card-body">
                <ReviewDisplay class="reviews" v-for="review in reviews.slice(0, 1)" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
            </div>
        </div>
        <div class="review-2">
            <div class="card-body">
                <ReviewDisplay class="reviews" v-for="review in reviews.slice(1, 2)" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
            </div>
        </div>
        <div class="book">
            <div class="card">
                <router-link :to="'/book/' + id">
                    <img class="bookImg" :src="path">
                </router-link>
            </div>

        </div>
      
    </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { db } from '../firebase/firebase';
import { getDocs, query, collection, where } from "firebase/firestore"; 
import ReviewDisplay from './ReviewDisplay.vue';

//Defines the input for the spesific book, what kind of book should it be?
const props = defineProps({
  bookInfo: { type: String },
})
const path = ref()
const reviews = ref([])
//Gets the id from the database.
let id = props.bookInfo.split(";")[1]


//Async function to determine the path of the books. This is only for local files!
watchEffect(async () => {
    path.value = props.bookInfo.split(";")[0]
    const q = query(collection(db, "reviews"), where("book.id", "==", id));
    const querySnapshot = await getDocs(q);
    const reviewArray = [];
    querySnapshot.forEach((doc) => {
        const review = {
            uid: doc.data().user.id,
            title: doc.data().title,
            rating: doc.data().rating,
            review: doc.data().review,
            id: doc.id
        }
        if (review.review.length < 200) {
            reviewArray.push(review)
        }
        
    });
    reviews.value = reviewArray; 
})


</script>

<style scoped>   

.book{ 
    padding-right: 48vh;
    padding-bottom: 1vh;
    text-align: center;
    animation-name: floating;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    bottom: 0.5vh;
}

.bookImg {    
    border-radius: 5px;
    height: 30vh;
    width: 21vh;
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
    -webkit-transform: scale(1.025);
    transform: scale(1.025);
}

.review-1 {
    text-align: left;
    position: absolute;
    top: 4vh;
    left: 32vh;
    width: 50vh;
    height: 20vh;
    animation-name: floating;
    animation-duration: 9s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

}

.review-2 {
    text-align: left;
    position: absolute;
    top: 18vh;
    left: 32vh;
    width: 50vh;
    height: 20vh;
    animation-name: floating;
    animation-duration: 8s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

}


@keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 22px); }
    100%   { transform: translate(0, -0px); }   
}

</style>
