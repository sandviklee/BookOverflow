<template>
  <div class="background">
    <div class="card">
      <div class="author-image">
        <img class="authorImg" :src="imgUrl">
        <div class="author-icon"></div>
      </div>
      <div class="author-Name">
        <h1 class="name">{{ authorInfo.name }}</h1>
      </div>
      <div class="author-desc">
        <h6>Born: {{ authorInfo.born }}</h6>
      </div>
      <div class="awards">
        <h1>
          <i class="pi pi-globe" style="font-size: 1.5rem"></i>&ensp;Awards:
        </h1>
        <div class="award">
          <button class="button is-ghost is-normal" v-for="award in authorInfo.awards">{{ award }}</button>
        </div>
      </div>
      <div class="card-body" v-if="books.length">
        <Book v-for="book in books" :key="book.id" :bookInfo="`${book.image_url};${book.id};${book.rating}`" />
      </div>
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

    authorInfo.name = docSnapAuthor.data().name;
    authorInfo.born = docSnapAuthor.data().born.toDate().toDateString();
    imgUrl.value = docSnapAuthor.data().image_url;

    authorInfo.awards = docSnapAuthor.data().awards.map(award => award.trim());
  } else {
    console.log("No such document!");
  }

  const q = query(collection(db, "books"), where("author.id", "==", author));
  const querySnapshot = await getDocs(q);
  const bookArray = [];
  querySnapshot.forEach((doc) => {
    const book = {
      id: doc.id,
      image_url: doc.data().image_url,
      rating: doc.data().avgRating,
    };
    if (bookArray.length !== 6) {
      bookArray.push(book);
    }
  });

  books.value = bookArray;
});

</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/lato');

.background {
  text-shadow: 1px 0.5px 0px #E98074;
  margin: auto;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #D8C3A5;
}

header {
  padding-top: 1vh;
  font-weight: 700;
}

.card {
  background-color: #EAE7DC;
  min-height: 200vh;
}

.author-image {
  position: relative;
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  width: 25vh;
  height: 35vh;
  border-radius: 5px;
  overflow: hidden;
}

.authorImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-icon {
  position: absolute;
  bottom: -3vh;
  left: 50%;
  transform: translateX(-50%);
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  background-color: #E98074;
  box-shadow: 0px 3px 0px 0px #C97966;
}

.author-Name {
  margin-top: 4vh;
  text-align: center;
}

.name {
  font-size: 4vh;
  font-weight: bold;
}

.author-desc {
  margin-top: 1vh;
  text-align: center;
}

.awards {
  margin-top: 2vh;
  padding: 0 8vh;
}

.award {
  margin-top: 2vh;
  display: flex;
  justify-content: center;
}

.button {
  margin: 0 1vh;
  background-color: #E98074;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 2vh;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color:
    #C97966;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 5vh;
}

.books {
  margin: 2vh;
  width: 20vw;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>