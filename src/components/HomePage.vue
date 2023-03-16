<template>
    <div class="background">
        
            <div class="main">
                <div class="card mb-6">
                    <div class="card-body">
                        
                    </div>
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
                                <Book class="books" v-for="book in books" :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"/>
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
                                <Book class="books" v-for="book in books" :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"/>
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
                                <Book class="books" v-for="book in books" :bookInfo="book.image_url + ';' + book.id + ';' + book.rating"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>
  
<script setup>
import { db } from '../firebase/firebase.js'
import { ref, onMounted} from 'vue'
import { collection, getDocs } from 'firebase/firestore';
import Book from './Book.vue';
import { userStore } from '../stores/UsersStore';

//Implement shuffle function for booklists.
function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
}

const books = ref([])
const store = userStore();

//Get books from database, and generalize them with id, author and title.
onMounted(async () => {
    console.log(store.uid, " er ID.");
    const querySnapshot = await getDocs(collection(db, 'books'));
    let bookArray = []
    querySnapshot.forEach((doc) => {
        const book = {
            id: doc.id,
            image_url: doc.data().image_url,
            rating: doc.data().avgRating
        }
        if (bookArray.length !== 6) {
            bookArray.push(book)
            return
        }
        
    });
    books.value = bookArray
})
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
