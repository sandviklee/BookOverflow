<template>
    <div class="main">
        <div class="card mb-6">
            <div class="card-body">
                

            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-3">
                    <span class="icon-text">
                        <div class="card-header-title pl-5">
                        <span class="icon">
                            <i class="pi pi-megaphone"></i>
                        </span>
                        <h3>Discover</h3>
                    </div>
                    </span>

                    <div class="card-body">
                        <Book class="books" v-for="book in books" :imagePath="book.author + '/' + book.title + '.png'"/>
                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="card mb-3">
                    <span class="icon-text">
                        <div class="card-header-title pl-5">
                        <span class="icon">
                            <i class="pi pi-thumbs-up"></i>
                        </span>
                        <h3>Popular Books</h3>
                        </div>
                    </span>

                    <div class="card-body">

                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="card mb-3">
                    <span class="icon-text">
                        <div class="card-header-title pl-5">
                        <span class="icon">
                            <i class="pi pi-star"></i>
                        </span>
                        <h3>Favorites</h3>
                    </div>
                    </span>
                    <div class="card-body">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

import { db } from '../firebase/firebase.js'
import {ref, onMounted} from 'vue'
import { collection, getDocs } from "firebase/firestore";

const books = ref([])

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
    books.value = bookArray
})
console.log(books);

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
    padding-left: 10px;
    padding-top: 10px;
}

.card-body {
    height: 22vh;
}

.books {
    display: inline-block;
    padding: 1vh 2vh;
}

</style>
