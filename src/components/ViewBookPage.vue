<template>
  <div class="background" >
  <header>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            
            <div class="book-image">
              <img class="bookImg" :src="imgUrl">
            </div>

            <div class="book-title">
              <h1 class="title">{{ bookName }} </h1>
              <router-link :to="'/author/' + authorId">
                <h1 class="author">By {{ authorName }}</h1>
              </router-link>
            </div>
             
            <div class="book-rating">
              <img class="rating-img" src="../assets/BookOverflow/logo.png" alt="">
              <div class="rating">
                <h1 class="rating-text"> 
                  <i class="pi pi-star-fill" style="font-size: 2rem"></i>&ensp;{{ bookRating }} / 5
                </h1>
              </div>
              
            </div>

            <div class="book-desc">
              <h6>
                {{ bookBlurb }}
              </h6>
            </div>

            <div class="published">
              <h1 class="published-text">
                <i class="pi pi-calendar" style="font-size: 1.5rem"></i>&ensp;Published Date: {{ publishedText }}
              </h1>
            </div>

            <div class="genres">
              <h1>
                <i class="pi pi-book" style="font-size: 1.5rem"></i>&ensp;Genres:
              </h1>
              <div class="genre">
                <button class="button is-ghost is-normal" v-for="genre in bookGenres">{{ genre }}</button>
              </div>
            </div>

            <div class="awards">
              <h1>
                <i class="pi pi-globe" style="font-size: 1.5rem"></i>&ensp;Awards:
              </h1>
              <div class="award">
                <button class="button is-ghost is-normal" v-for="award in bookAwards">{{ award }}</button>
              </div>
            </div>
            
            <hr class="line">

            <div class="book-review">

              <h1 class="title">Ratings & Reviews</h1>

              <div v-show="store.uid == 'no user'" class="if-not-signed-in">
                <h1 class="subtitle">YOU NEED TO SIGN IN TO CREATE A REVIEW:</h1>
                <router-link to="/signup">
                  <div class="sign-in-button">
                    <button
                    type="button"
                    class="button is-link is-large"><i class="pi pi-user" style="font-size: 1rem"></i>&ensp;Sign In</button>
                  </div>
                </router-link>
              </div>

              <div v-show="store.uid !== 'no user'" class="if-signed-in">
                <h1 class="subtitle">CREATE, EDIT OR DELETE YOUR REVIEW:</h1>

                  <button
                  type="button"
                  @click="goToReview"
                  :disabled="!createReview"
                  class="button is-link is-medium"><i class="pi pi-plus" style="font-size: 1rem"></i>&ensp;CREATE REVIEW</button>

                  <button
                  type="button"
                  @click="deleteReview"
                  :disabled="createReview"
                  class="button is-danger is-medium" disabled><i class="pi pi-trash" style="font-size: 1rem"></i>&ensp;DELETE REVIEW</button>
                </div>


              <h1 class="subtitle">REVIEWS:</h1>

                <div class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                      <span>RATING SOURCE</span>
                      <span class="icon is-small">
                        <i class="pi pi-chevron-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <p>Here you can change the source of ratings.
                          <hr>
                          <button
                          type="button"
                          disabled
                          class="button is-link is-medium">BookOverflow</button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                      <span>Sort by</span>
                      <span class="icon is-small">
                        <i class="pi pi-chevron-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <p>
                          Here you can change what you want to sort by:
                          <hr>
                          <p>Reset:</p>
                          <button
                          type="button"
                          @click="changeRatingPage(0)"
                          class="button is-link is-medium">Reset Rating</button>
                          <p>Rating:</p>
                          <ul class="pagination-list">
                            <li>
                              <a 
                              @click="changeRatingPage(1)"
                              class="pagination-link" id="rating1" aria-label="Page 1" aria-current="page">1</a>
                            </li>
                            <li>
                              <a
                              @click="changeRatingPage(2)" 
                              class="pagination-link" id="rating2" aria-label="Goto page 2">2</a>
                            </li>
                            <li>
                              <a
                              @click="changeRatingPage(3)" 
                              class="pagination-link" id="rating3" aria-label="Goto page 2">3</a>
                            </li>
                            <li>
                              <a
                              @click="changeRatingPage(4)" 
                              class="pagination-link" id="rating4" aria-label="Goto page 2">4</a>
                            </li>
                            <li>
                              <a
                              @click="changeRatingPage(5)" 
                              class="pagination-link" id="rating5" aria-label="Goto page 2">5</a>
                            </li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="paging">
                  <nav class="pagination" role="navigation" aria-label="pagination">
                    <a 
                    @click="changeReviewPage(0)"
                    class="pagination-previous is-disabled" title="This is the first page"
                    >Previous</a>
                    <a 
                    @click="changeReviewPage(1)"
                    class="pagination-next"
                    >Next page</a>
                    <ul class="pagination-list">
                      <li>
                        <a 
                        @click="changeReviewPage(0)"
                        class="pagination-link is-current" id="page1" aria-label="Page 1" aria-current="page">1</a>
                      </li>
                      <li>
                        <a
                        @click="changeReviewPage(1)" 
                        class="pagination-link" id="page2" aria-label="Goto page 2">2</a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <form class="box">
                  <Review v-show="reviewPage == 0 && ratingPage == 0" class="reviews" v-for="review in reviewsStandard[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 1 && ratingPage == 0" class="reviews" v-for="review in reviewsStandard[1]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 0 && ratingPage == 1" class="reviews" v-for="review in reviewsStar1[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 1 && ratingPage == 1" class="reviews" v-for="review in reviewsStar1[1]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 0 && ratingPage == 2" class="reviews" v-for="review in reviewsStar2[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 1 && ratingPage == 2" class="reviews" v-for="review in reviewsStar2[1]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 0 && ratingPage == 3" class="reviews" v-for="review in reviewsStar3[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 1 && ratingPage == 3" class="reviews" v-for="review in reviewsStar3[1]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 0 && ratingPage == 4" class="reviews" v-for="review in reviewsStar4[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 1 && ratingPage == 4" class="reviews" v-for="review in reviewsStar4[1]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 0 && ratingPage == 5" class="reviews" v-for="review in reviewsStar5[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                  <Review v-show="reviewPage == 1 && ratingPage == 5" class="reviews" v-for="review in reviewsStar5[1]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review + ';' + review.id"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { db } from '../firebase/firebase';
import { doc, getDoc, getDocs, query, collection, where, deleteDoc, updateDoc } from "firebase/firestore"; 
import { userStore } from '../stores/UsersStore';
import Review from './Review.vue';

const route = useRoute()
const router = useRouter()
const store = userStore()
const bookName = ref()
const authorName = ref()
const bookBlurb = ref()
const imgUrl = ref()
const publishedText = ref()
const bookGenres = ref([])
const bookAwards = ref([])
const reviewsStandard = ref([])
const reviewsStar1 = ref([])
const reviewsStar2 = ref([])
const reviewsStar3 = ref([])
const reviewsStar4 = ref([])
const reviewsStar5 = ref([])
const bookRating = ref()
const reviewPage = ref(0)
const ratingPage = ref(0)

let createReview = true;
let book = route.params.id;
let reviewId = ''
let authorId = ''
let reviews = []

/**
 * Slices an array into a 2D array with max sized chunks.
 * @param {*} arr       is the array.
 * @param {*} chunkSize is the max size of the inner array.
 */
function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

/**
 * Adds the specific rating to a ref.
 * @param {*} array  is the array you want to get ratings from.
 * @param {*} rating is the rating you want to check for.
 * @param {*} ref    is the ref you want to add the ratings to.
 */
function addRatingToRef(array, rating, ref) {
  let finishedArray = []
  array.forEach(element => {
    if (element.rating == rating) {
      finishedArray.push(element);
    };
  });
  ref.value = sliceIntoChunks(finishedArray, 5);
}

/**
 * Calculates the average rating of the book from reviews.
 */
async function calculateAvgRating() {
  let avgRating = 0;
  if (reviews.length == 0) {
    return
  }
  reviews.forEach(review => {
    avgRating = avgRating + review.rating;
  });
  avgRating =(avgRating/reviews.length); 
  
  if (avgRating == bookRating.value) {
    return
  }
  const bookRef = doc(db, "books", book);
  
  await updateDoc(bookRef, {
    avgRating: avgRating
  });
}

/**
 * Changes the rating page.
 * @param {*} pageNumber is the number of the page.
 */
function changeRatingPage(pageNumber) {
  ratingPage.value = pageNumber;
}

/**
 * deletes the review.
 */
async function deleteReview() {
  await deleteDoc(doc(db, "reviews", reviewId));
  window.location.reload()
}

/**
 * Change page to the write review page.
 * Checks if the user is logged in.
 */
function goToReview() {
  if (store.uid !== 'no user') {
    router.push('/review/' + book)
  }
}

/**
 * Changes the review page.
 * @param {*} pageNumber is the number of the page.
 */
function changeReviewPage(pageNumber) {
  if (pageNumber == 1) {
    document.getElementById("page2").className = 'pagination-link is-current';
    document.getElementById("page1").className = 'pagination-link';
  } else {
    document.getElementById("page1").className = 'pagination-link is-current';
    document.getElementById("page2").className = 'pagination-link';
  }
  reviewPage.value = pageNumber;
}

/**
 * On mounted function to retrieve everything we need on start.
 */
onMounted(async () => { 
  const q = query(collection(db, "reviews"), where("book.id", "==", book));
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
      if (review.uid == store.uid) {
        reviewId = doc.id; 
        createReview = false;
      }
      reviewArray.push(review)
  });
  reviews = reviewArray;
  reviewsStandard.value = sliceIntoChunks(reviewArray, 5);
  addRatingToRef(reviewArray, 1, reviewsStar1);
  addRatingToRef(reviewArray, 2, reviewsStar2);
  addRatingToRef(reviewArray, 3, reviewsStar3);
  addRatingToRef(reviewArray, 4, reviewsStar4);
  addRatingToRef(reviewArray, 5, reviewsStar5);

  //Get book information
  const docBook = await doc(db, 'books', book);
  const docSnapBook = await getDoc(docBook);

  let bname = docSnapBook.data().title
  let aname = docSnapBook.data().author.name
  let aid = docSnapBook.data().author.id
  let blurb = docSnapBook.data().blurb
  let image = docSnapBook.data().image_url
  let genres = docSnapBook.data().genres
  let awards = docSnapBook.data().awards
  let published = docSnapBook.data().published.toDate().toDateString()
  let rating = docSnapBook.data().avgRating

  if (docSnapBook.exists()) {
    bookName.value = bname;
    authorName.value = aname;
    bookBlurb.value = blurb;
    imgUrl.value = image;
    publishedText.value = published;
    // Fra https://stackoverflow.com/questions/5623096/how-do-i-format-a-number-to-2-decimal-places-but-only-if-there-are-already-deci
    bookRating.value = rating.toFixed(2).replace(/[.,]00$/, ""); 
    authorId = aid;
    if (awards) {
      awards.forEach(award => {
      bookAwards.value.push(award)
    });
    }
    if (genres) {
      genres.forEach(genre => {
      bookGenres.value.push(genre)
    });
    }
  } else {
    console.log("No such document!");
  }
  calculateAvgRating();
})

</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/lato');
.background {
  text-shadow: 1px 0.5px 0px #E98074;
  margin: auto;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #D8C3A5;
}

header {
  padding-top: 1vh;
  font-weight: 700;
}

.card {
  background-color: #EAE7DC;
  min-height: 200vh;
}

.author {
  font-weight: bold;
}

.book-image {
  position: absolute;
  left: 8vh;
  top: 15vh;
}

.bookmark-icon {
  position: absolute;
  bottom: 35vh;
}

.book-title {
  position: absolute;
  left: 8vh;
  padding-top: 5vh;
}


.book-desc {
  position: absolute;
  padding-top: 17vh;
  max-width: 80vh;
  left: 43vh;
}

.subtitle {
  padding-top: 2vh;
}
.genres {
  padding: 62vh 8vh;
}

.genre {  
  position: absolute;
  top: 64.5vh;
  left: 20vh;
}


.awards {
  position: absolute;
  padding: 0vh 8vh;
  top: 71vh;
}

.award {
  position: relative;
  padding-left: 12vh;
  bottom: 3.5vh;
}

.published {
  position: relative; 
  top: 59vh;
  left: 8vh;
}

.rating {
  color: black;
}

.rating-text {
  font-size: 2vh;
  font-weight: bold;
}

.book-rating {
  position: absolute;
  padding-top: 6vh;
  left: 100vh;
  text-align: center;
}

.rating-img {
  width: 20vh;
  padding-left: 1vh;
}

.published-text {
  font-weight: 700vh;
}

.book-review {
  position: absolute;
  width: 87%;
  top: 80vh;
  left: 8vh;
}

.paging {
  padding-top: 2vh;
  padding-bottom: 2vh;
}

.bookImg {    
    border-radius: 5px;
    height: 40vh;
    width: 28vh;
    box-shadow: 4px 0px 0px #E98074;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
}

.bookImg:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
}
.line {
  position: relative;
  bottom: 54vh;
  height: 0.5vh;
  width: 95%;
  left: 3.5vh;
}

.dropdown-content {
  width: 28vh;
}
</style>