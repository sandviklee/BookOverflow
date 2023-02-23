<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5>Popular Books</h5>
                    </div>
                    <div class="card-body">
                        <div v-for="(book, index) in popularBooks" :key="index">
                            <h6>{{ book.title }}</h6>
                            <p>{{ book.author }}</p>
                            <!-- <p>Rating: {{ book.rating }}</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, getDocs, query, orderBy, endAt } from 'firebase/firestore'
import { db } from './firebase'

const popularBooks = ref({})
 
// const q = query(citiesRef, orderBy("population"), endAt(1000000));

onMounted(() => {
        //legge til en query for
        onSnapshot(collection(db, 'books'), (querySnapshot) => {
        const listBooks = []
        //loop through all documents in books and log out the doc id and doc data (all fields)
        querySnapshot.forEach((doc) => {
            const book = {
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author
            }
            listBooks.push(book)
        })
        popularBooks.value = listBooks
        })
    })
onMounted(() => {
    //legge til en query for
    onSnapshot(collection(db, 'books'), (querySnapshot) => {
    const listBooks = []
    //loop through all documents in books and log out the doc id and doc data (all fields)
    querySnapshot.forEach((doc) => {
        const book = {
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author
        }
        listBooks.push(book)
        })
        popularBooks.value = listBooks
    })
})

</script>