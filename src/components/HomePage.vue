<template>
  <div class="background">
    <div class="main">
      <div class="card mb-6">
        <div class="card-body"></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-6">
            <span class="icon-text">
              <div class="card-header-title pl-5">
                <span class="icon">
                  <i class="pi pi-megaphone"></i>
                </span>
                <h3>Discover</h3>
              </div>
            </span>

            <div class="card-body">
              <Book
                class="books"
                v-for="book in randomBooks.slice(0, 6)"
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

<script setup>
import { db } from "../firebase/firebase.js";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import Book from "./Book.vue";

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
  width: 80%;
  text-align: center;
  padding-left: 35vh;
}

.card-body {
  height: 23vh;
}

.books {
  display: inline-block;
  padding: 1vh 3.7vh;
}
</style>
