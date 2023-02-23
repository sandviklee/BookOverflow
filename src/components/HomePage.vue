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
                            <p>Rating: {{ book.rating }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5>New Releases</h5>
                    </div>
                    <div class="card-body">
                        <div v-for="(book, index) in newReleases" :key="index">
                            <h6>{{ book.title }}</h6>
                            <p>{{ book.author }}</p>
                            <p>Rating: {{ book.rating }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
  
<script>


import { db } from './firebase';
export default {
    data() {
        return {
            popularBooks: [],
            newReleases: []
        }
    },
    mounted() {
    db.ref('books').on('value', snapshot => {
      const bookArray = [];
      snapshot.forEach(book => {
        bookArray.push({ id: book.key, ...book.val() });
      });
      this.books = bookArray;
    });
  }
};

</script>