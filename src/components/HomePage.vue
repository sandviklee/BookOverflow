<template>
  <div class="background">
    <div class="main">
      <div class="card mb-6 height-6">
        <div class="card-carousel">

          <span class="icon-text">
            <div class="card-header-title pl-5">
              <span class="icon">
                <i class="pi pi-megaphone" style="font-size: 1.5rem;"></i>
              </span>
              <h3 class="subtitle">Discover</h3>

            </div>
            <h6 class="what-to-read">What do you want to read today?</h6>
          </span>
          <div class="carousel">
            <carousel :items-to-show="1"
            :autoplay="3000"
            :wrap-around="true">
              <slide v-for="slide in 5" :key="slide">
                <div class="display">
                  <BookDisplay
                  class="bigBooks"
                  v-for="book in randomBooks.slice(slide, slide + 1)"
                  :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
                  />
                </div>

              </slide>
          
              <template #addons>
                <navigation />
                <pagination />
              </template>
            </carousel>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-thumbs-up"></i>
                </span>
                <h3>High Rating</h3>
              </div>
            </span>

            <div class="card-body">
              <Book
                class="books"
                v-for="book in topRatedBooks.slice(0, 6)"
                :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
              />
            </div>
          </div>
        </div>

        <div class="col-md-10">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-bolt"></i>
                </span>
                <h3>Action</h3>
              </div>
            </span>

            <div class="card-body">
              <Book
                class="books"
                v-for="book in actionBooks.slice(0, 6)"
                :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
              />
            </div>
          </div>
        </div>

        <div class="col-md-10">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-heart"></i>
                </span>
                <h3>Romance</h3>
              </div>
            </span>

            <div class="card-body">
              <Book
                class="books"
                v-for="book in romanceBooks.slice(0, 6)"
                :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
              />
            </div>
          </div>
        </div>

        <div class="col-md-10">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-eye-slash"></i>
                </span>
                <h3>Horror</h3>
              </div>
            </span>

            <div class="card-body">
              <Book
                class="books"
                v-for="book in horrorBooks.slice(0, 6)"
                :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
              />
            </div>
          </div>
        </div>

        <div class="col-md-10">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-images"></i>
                </span>
                <h3>Manga</h3>
              </div>
            </span>

            <div class="card-body">
              <Book
                class="books"
                v-for="book in mangaBooks.slice(0, 6)"
                :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"
              />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
}
</script>

<script setup>
import { db } from "../firebase/firebase.js";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import Book from "./Book.vue";
import BookDisplay from "./BookDisplay.vue"

const books = ref([]);
const randomBooks = ref([]);
const topRatedBooks = ref([]);
const actionBooks = ref([]);
const romanceBooks = ref([]);
const horrorBooks = ref([]);
const mangaBooks = ref([]);


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function sortBooksGenres(allBooks, genre) {
    let sortedBooks = []
    allBooks.forEach(book => {
        if (book.genres.includes(genre)) {
            sortedBooks.push(book)
        }
    });
    return sortedBooks;
}

function sortBooksRating(allBooks, rating) {
    let sortedBooks = []
    allBooks.forEach(book => {
        if (book.rating >= rating) {
            sortedBooks.push(book)
        }
    });
    return sortedBooks;
}


//Get books from database, and generalize them with id, image_url and title.
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "books"));
  let bookArray = [];
  querySnapshot.forEach((doc) => {
    const book = {
      id: doc.id,
      image_url: doc.data().image_url,
      rating: doc.data().avgRating,
      genres: doc.data().genres
    };
    bookArray.push(book);
  });
  books.value = bookArray;
  let topRated = sortBooksRating(bookArray, 4)
  let action = sortBooksGenres(bookArray, "Action");
  let romance = sortBooksGenres(bookArray, "Romance")
  let horror = sortBooksGenres(bookArray, "Horror")
  let manga = sortBooksGenres(bookArray, "Manga")


  

  topRatedBooks.value = shuffleArray(topRated)
  randomBooks.value = shuffleArray(bookArray)
  actionBooks.value = shuffleArray(action)
  romanceBooks.value = shuffleArray(romance)
  horrorBooks.value = shuffleArray(horror)
  mangaBooks.value = shuffleArray(manga)
  console.log(randomBooks.value[0]);
});
</script>

<style scoped>
.background {
  padding: 0;
  margin: 0;
  min-height: 100%;
  width: 100%;
  background-color: rgba(234, 231, 220, 1);
}

.main {
  width: 75%;
  text-align: center;
  padding-left: 42vh;
}

.card-body {
  height: 24vh;
}
.books {
  display: inline-block;
  padding: 1vh 3.7vh;
}

.card-carousel {
  height: 43vh;
}

.display {
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
}

.what-to-read {
  position: absolute;
  font-weight: bold;
  text-shadow: 1px 0.5px 0px #E98074;
  top: 3.5vh;
  left: 32vh;
}
</style>
