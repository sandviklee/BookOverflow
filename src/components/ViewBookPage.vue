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
              <h1 class="author">By {{ authorName }}</h1>
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

                class="button is-link is-medium"><i class="pi pi-plus" style="font-size: 1rem"></i>&ensp;CREATE REVIEW</button>

                <button
                type="button"
                :disabled="createReview"
                class="button is-link is-medium"><i class="pi pi-pencil" style="font-size: 1rem"></i>&ensp;EDIT REVIEW</button>

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
                        BookOverflow
                        <hr>
                        Outsourced
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
                        Highest rated
                        <hr>
                        Highest likes
                        <hr>
                        Lowest rated
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="paging">
                <nav class="pagination" role="navigation" aria-label="pagination">
                  <a class="pagination-previous is-disabled" title="This is the first page">Previous</a>
                  <a class="pagination-next">Next page</a>
                  <ul class="pagination-list">
                    <li>
                      <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
                    </li>
                    <li>
                      <a class="pagination-link" href="/" aria-label="Goto page 2">2</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 3">3</a>
                    </li>
                  </ul>
                </nav>
              </div>

              <form class="box">
                <Review class="reviews" v-for="review in reviews[0]" :reviewInfo="review.uid + ';' + review.title + ';' + review.rating + ';' + review.review"/>
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
import { doc, getDoc, getDocs, query, collection, where, addDoc, deleteDoc  } from "firebase/firestore"; 
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
const bookRating = ref()

let createReview = true;

let book = ''
book = route.params.id;

let reviewId = ''

const reviews = ref([])

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

//Retrives book information from the ID when you click on a book.
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
      }
      if (review.uid == store.uid) {
        reviewId = doc.id; 
        createReview = false;
      }
      reviewArray.push(review)
  });
  
  reviews.value = sliceIntoChunks(reviewArray, 6);
  
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
    console.log("Document data:", docSnapBook.data());
    bookName.value = bname.replace(/\_/g, ' ');
    authorName.value = aname.replace(/\_/g, ' ');
    bookBlurb.value = blurb;
    imgUrl.value = image;
    publishedText.value = published;
    bookRating.value = rating;
    awards.forEach(award => {
      bookAwards.value.push(award)
    });
    genres.forEach(genre => {
      bookGenres.value.push(genre)
    });

  } else {
    console.log("No such document!");
  }
})

async function deleteReview() {
  await deleteDoc(doc(db, "reviews", reviewId));
  window.location.reload()
}

function goToReview() {
  if (store.uid !== 'no user') {
    router.push('/review/' + book)
  }
}


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
  bottom: 56vh;
  height: 0.5vh;
  width: 95%;
  left: 3.5vh;
  
}


</style>