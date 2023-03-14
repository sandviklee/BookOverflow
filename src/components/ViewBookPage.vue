<template>
  <div class="background">
    
  <header>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li><a href="/">BookOverflow</a></li>
              <li><a href="/thelibrary">TheLibrary</a></li>
              <li class="is-active"><a href="#" aria-current="page">{{ bookName }}</a></li>
            </ul>
          </nav>
          <div class="card">

            <div class="book-image">
              <img class="bookImg" :src="imgUrl">
            </div>

            <div class="book-title">
              <h1 class="title">{{ bookName }} </h1>
              <h1 class="author">By {{ authorName }}</h1>
            </div>

            <div class="book-desc">
              <h6>
                {{ bookBlurb }}
              </h6>
            </div>

            <div class="genres">
              <h1>
                Genres
              </h1>
              <div class="genre">
                <button class="button is-ghost is-normal" v-for="genre in bookGenres">{{ genre }}</button>
              </div>
            </div>

            <div class="published">
              <h1 class="published-text">
                Published: {{ publishedText }}
              </h1>
            </div>

          </div>
        </div>
      </div>
    </div>
  </header>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted} from 'vue'
import { db } from '../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";

const route = useRoute()
const bookName = ref()
const authorName = ref()
const bookBlurb = ref()
const imgUrl = ref()
const publishedText = ref()
const bookGenres = ref([])

let book = ''
book = route.params.id;

//Retrives book information from the ID when you click on a book.
onMounted(async () => {
  const docRef = await doc(db, 'books', book);
  const docSnap = await getDoc(docRef);

  let bname = docSnap.data().title
  let aname = docSnap.data().author.name
  let blurb = docSnap.data().blurb
  let image = docSnap.data().image_url
  let genres = docSnap.data().genres
  let published = docSnap.data().published

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    bookName.value = bname.replace(/\_/g, ' ');
    authorName.value = aname.replace(/\_/g, ' ');
    bookBlurb.value = blurb;
    imgUrl.value = image;
    publishedText.value = published;
    genres.forEach(genre => {
      bookGenres.value.push(genre)
    });

  } else {
    console.log("No such document!");
  }
})

</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/lato');
.background {
  margin: auto;
  padding: 0;
  margin: 0;
  height: 120h;
  width: 100%;
  background-color: #D8C3A5;
}

header {
  padding-top: 1vh;
  font-weight: 700;
}

.card {
  background-color: #EAE7DC;
  min-height: 100vh;
}

.author {
  font-weight: bold;
}

.book-image {
  position: absolute;
  left: 8vh;
  top: 15vh;
}

.book-title {
  position: absolute;
  left: 8vh;
  padding-top: 4vh;
}

.book-desc {
  position: absolute;
  padding-top: 15vh;
  max-width: 90vh;
  left: 43vh;
}

.genres {
  
  padding: 58vh 8vh;
  
}

.genre {
  display: flex;
  padding: 0vh 0.1vh;
}

.published {
  position: relative;
  bottom: 55vh;
  left: 8vh;
}

.published-text {
  font-weight: 400vh;
}

.bookImg {    
    border-radius: 5px;
    height: 40vh;
    width: 28vh;
    box-shadow: 4px 0px 0px #E98074;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
}

.bookImg:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
}

</style>