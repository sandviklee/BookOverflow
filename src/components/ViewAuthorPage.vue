<template>
  <div>
    <div class="author-image">
      <img class="authorImg" :src="imgUrl">
      <div class="author-icon"></div>
    </div>
    <div class="author-Name">
      <h1 class="name"> {{ authorInfo.name }} </h1>
    </div>

    <div class="author-desc">
      <h6>
        Born: {{ authorInfo.born }}
      </h6>
    </div>

    <div class="awards">
      <h1>
        <i class="pi pi-globe" style="font-size: 1.5rem"></i>&ensp;Awards:
      </h1>
      <div class="award">
        <button class="button is-ghost is-normal" v-for="award in authorInfo.awards">{{ award }}</button>
      </div>
    </div>

    <div class="card-body">
      <Book class="books" v-for="book in books" :key="book.id"
        :bookInfo="book.image_url + ';' + book.id + ';' + book.rating" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase.js'
import Book from './Book.vue'

const authorInfo = reactive({
  name: '',
  born: '',
  awards: [],
  image_url: '',
})

const imgUrl = ref('')
const books = ref([])
const route = useRoute()

let author = ''
author = route.params.id;

onMounted(async () => {
  const docAuthor = await doc(db, 'author', author);
  const docSnapAuthor = await getDoc(docAuthor);

  if (docSnapAuthor.exists()) {
    console.log("Document data:", docSnapAuthor.data());

    authorInfo.name = docSnapAuthor.data().name.replace(/\_/g, ' ');
    authorInfo.born = docSnapAuthor.data().born.toDate().toDateString();
    imgUrl.value = docSnapAuthor.data().image_url;

    authorInfo.awards = docSnapAuthor.data().awards.map(award => award.trim());
  } else {
    console.log("No such document!");
  }

  const q = query(collection(db, "books"), where("author", "==", author));
  const querySnapshot = await getDocs(q);
  const bookArray = [];
  querySnapshot.forEach((doc) => {
    const book = {
      id: doc.id,
      image_url: doc.data().image_url,
    };
    if (bookArray.length !== 6) {
      bookArray.push(book);
      return;
    }
  });
  books.value = bookArray;
});

</script>

<style scoped>
.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.books {
  display: inline-block;
  padding: 1vh 3.7vh;
  margin: 1rem;
}
</style>
