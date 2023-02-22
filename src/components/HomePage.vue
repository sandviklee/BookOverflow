<template>
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
                        <Book class="books" v-for="book in booksDiscover" :imagePath="book.author + '/' + book.title + '.png;' + book.id"/>
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
                        <h3>Popular Books</h3>
                        </div>
                    </span>

                    <div class="card-body">
                        <Book class="books" v-for="book in booksPopular" :imagePath="book.author + '/' + book.title + '.png;' + book.id"/>
                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="card mb-6">
                    <span class="icon-text">
                        <div class="card-header-title pl-5">
                        <span class="icon">
                            <i class="pi pi-star"></i>
                        </span>
                        <h3>Favorites</h3>
                    </div>
                    </span>
                    <div class="card-body">
                        <Book class="books" v-for="book in books" :imagePath="book.author + '/' + book.title + '.png;' + book.id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { db } from '../firebase/firebase.js'
import { ref, onMounted} from 'vue'
import { collection, getDocs } from "firebase/firestore";

//Implement shuffle function for booklists.
function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
}

const books = ref([])
const booksDiscover = ref([])
const booksPopular = ref([])
const booksToday = ref([])

//Get books from database, and generalize them with id, author and title.
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'books'));
    let bookArray = []
    querySnapshot.forEach((doc) => {
        const book = {
            id: doc.id,
            author: doc.data().author.name,
            title: doc.data().title
        }
        bookArray.push(book)
    });
    books.value = booksDiscover.value = booksPopular.value = booksToday.value = bookArray
})
</script>

<script>
import Book from './Book.vue';
export default {
    components: {
        Book
    }
};

</script>

<style>
.main {
    width: 80%;
    text-align: center;
    padding-left: 35vh;
}

.card-body {
    height: 22vh;
}

.books {
    display: inline-block;
    padding: 1vh 3.7vh;
}

</style>
