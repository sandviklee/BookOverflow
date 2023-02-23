<template>
    <div class="view-book">
      <h1>{{ book.title }}</h1>
      <img :src="book.imageUrl" alt="Book cover image" />
      <h2>Author</h2>
      <p>{{ book.author }}</p>
      <h2>Summary</h2>
      <p>{{ book.summary }}</p>
      <h2>Genre</h2>
      <p>{{ book.genre }}</p>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase/firebase';
  
  export default {
    name: 'ViewBook',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        book: {},
      };
    },
    mounted() {
      db.collection('books').doc(this.id).get()
        .then((doc) => {
          if (doc.exists) {
            this.book = doc.data();
          } else {
            console.error('Book not found');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>  