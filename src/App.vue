<script>
export default{
  data(){
    return {
    }
  }
}
/*
  imports
*/

import { ref } from 'vue'

/*
  books
  Change it to get from Firebase
*/

/* const books = ref([
  {
    id: 'id1',
    title: 'Harry Potter & The Philosophers Stone',
    author: 'J.K Rowling',
    rating: '7',
    summary: 'In this story ...',
    inList: true
  },
  {
    id: 'id2',
    title: 'Lord of the Rings',
    author: 'J.R.R Tolkien',
    rating: '10',
    summary: '',
    inList: false
  }
])
*/

</script>

<template>
  <div class="BookOverflow">
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="../index.html">
          BookOverflow logo
        </a>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div id="navbar" class="navbar-menu">
        <div class="navbar-item">
          <input v-model="text" placeholder="Find a book or author">
          <button @click="search">search</button>
          <p class="control">
            <a class="bd-list-button button" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
              <span>
                My lists
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip">
              <span>
                User
              </span>
            </a>
          </p>
        </div>
      </div>
    </nav>

    <div class="lists">
      <p>
        Add different lists from firebase database to the website with scripts
      </p>
    </div>
  </div>
</template>

<style>

.BookOverflow{
  padding: 10px;
  margin: 0 auto;
  background-color: rgba(234, 231, 220, 1);
}

.navbar{
  background-color: rgba(216, 195, 165, 1);
}

.p{
  color:black;
}
</style>