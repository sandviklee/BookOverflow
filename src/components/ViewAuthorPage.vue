<template>
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div id="card">

            <div class="author-image">
              <img class="authorImg" :src="imgUrl">
              <div class="author-icon"></div>
            </div>

            <div class="author-Name">
              <h1 class="name">{{ authorInfo.name }}</h1>
            </div>
            <div class="born">
              <h2>
                <strong>
                  <i class="pi pi-calendar" style="font-size: 1.5rem"></i>&ensp;Born:
                </strong>
              </h2>
              <div id="born">{{ authorInfo.born }}</div>
            </div>
            <div class="author-desc">
              <p>{{ authorInfo.about }}</p>
            </div>
            <div class="awards">
              <h1>
                <strong>
                  <i class="pi pi-globe" style="font-size: 1.5rem"></i>&ensp;Awards:
                </strong>
              </h1>
              <div class="award">
                <button class="button is-ghost is-normal" v-for="award in authorInfo.awards">{{ award }}</button>
              </div>

            </div>
            <div id="container">
              <div class="row">
                <div class="col-md-10">
                  <div class="card mb-6">
                    <span class="icon-text">
                      <div class="card-header-title pl-5">
                        <span class="icon">
                          <i class="pi pi-book"></i>
                        </span>
                        <h3 class="subtitle">Books by the author</h3>
                      </div>
                    </span>
                    <div class="card-body" v-if="books.length">
                      <Book class="books" v-for="book in books" :key="book.id"
                        :bookInfo="`${book.image_url};${book.id};${book.rating}`" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  about: '',
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
    authorInfo.name = docSnapAuthor.data().name;
    authorInfo.born = docSnapAuthor.data().born.toDate().toDateString();
    imgUrl.value = docSnapAuthor.data().image_url;
    authorInfo.about = docSnapAuthor.data().about;
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
  background-color: rgba(216, 195, 165, 0.56);

}

header {
  padding-top: 1vh;
  font-weight: 700;
}

#card {
  background-color: #EAE7DC;
  min-height: 100vh;
}

#container {
  margin-top: 50vh;
  color: #D8C3A5;
  padding: 15px 15px;
}

.author-image {
  position: absolute;
  left: 8vh;
  top: 5vh;
}

.authorImg {
  border-radius: 5px;
  height: 50vh;
  width: 36vh;
  box-shadow: 4px 0px 0px #E98074;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

.author-icon {
  position: absolute;
  bottom: 35vh;
}

.author-Name {
  position: relative;
  padding-top: 5vh;
  left: 49vh;
}

.name {
  font-size: 4vh;
  font-weight: bold;
}

.born {
  position: relative;
  padding-top: 2vh;
  left: 49vh;
}
#born {
  position: relative;
  padding-left: 13.7vh;
  bottom: 2.7vh;
}
.author-desc {
  position: absolute;
  margin-top: 7vh;
  max-width: 80vh;
  left: 49vh;
  right: 12vh;
  font-size: 19px;
}

.awards {
  position: absolute;
  left: 47.5vh;
  padding: 15px;
}

.award {
  position: relative;
  padding-left: 12vh;
  bottom: 3.5vh;
}

.card-body {
  height: 23vh;
  background-color: #D8C3A5;
  padding-left: 10px;
  border-radius: 1vh;
}

.books {
  display: inline-block;
  padding: 1vh 3.7vh;
}
</style>