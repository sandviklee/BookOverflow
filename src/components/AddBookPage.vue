<template>
  <div class="background">
    <div class="card-holder">
      <div class="logo">
        <router-link to="/">
          <img
            class="bookOverflow-img"
            src="/src/assets/BookOverflow/logo.png"
            alt="BookOverflow Logo"
          />
        </router-link>
      </div>

      <div class="sign-in-text">
        <h1 class="subtitle">
          <i class="pi pi-pencil" style="font-size: 1.5rem"></i>ADD A NEW BOOK
        </h1>
      </div>

      <div class="card">
        <a class="book-image" href="#popup1">
          <h1>Cover</h1>
          <div class="plus-icon">
            <i
              class="pi pi-plus-circle"
              href="#popup1"
              style="font-size: 7vh"
            ></i>
          </div>

          <img class="bookImg" :src="imgUrl" />
        </a>
        <div class="title-field">
          <h1><i class="pi pi-book"></i> Title</h1>
          <p class="control">
            <input
              v-model="titleField"
              class="input is-medium"
              type="text"
              placeholder="Write title here..."
            />
          </p>
        </div>

        <div class="author-field">
          <h1><i class="pi pi-user-edit"></i> Author</h1>
          <p class="control">
            <input
              v-model="authorField"
              class="input is-medium"
              type="text"
              placeholder="Write author name here..."
            />
          </p>
        </div>

        <div class="first-published-field">
          <h1><i class="pi pi-calendar"></i> First Published</h1>
          <p class="control">
            <input
              v-model="publishedField"
              class="input is-medium"
              type="text"
              placeholder="yyyy-mm-dd"
            />
          </p>
        </div>

        <div class="awards-field">
          <h1><i class="pi pi-globe"></i> Awards</h1>
          <p class="control">
            <input
              v-model="awardsField"
              class="input is-medium"
              type="text"
              placeholder="Prize,Prize,Prize,..."
            />
          </p>
        </div>

        <div class="genres-field">
          <h1>Genres</h1>
          <div class="multiselect">
            <Multiselect
              v-model="genres"
              class="genres-multiselect"
              mode="tags"
              :close-on-select="false"
              :searchable="true"
              :create-option="false"
              :options="[
                { value: 'Horror', label: 'Horror' },
                { value: 'Action', label: 'Action' },
                { value: 'Fiction', label: 'Fiction' },
                { value: 'Romance', label: 'Romance' },
                { value: 'Adult', label: 'Adult' },
                { value: 'Manga', label: 'Manga' },
                { value: 'Historical Fiction', label: 'Historical Fiction' },
                { value: 'American', label: 'American' },
                { value: 'Contemporary', label: 'Contemporary' },
                { value: 'Literary Fiction', label: 'Literary Fiction' },
                { value: 'Teen', label: 'Teen' },
                { value: 'Thriller', label: 'Thriller' },
                { value: 'Paranormal', label: 'Paranormal' },
                { value: 'Mystery', label: 'Mystery' },
                { value: 'Fantasy', label: 'Fantasy' },
                { value: 'Classics', label: 'Classics' },
                { value: 'Dystopia', label: 'Dystopia' },
                { value: 'Science Fiction', label: 'Science Fiction' },
                { value: 'Post Apocalyptic', label: 'Post Apocalyptic' },
                { value: 'Adventure', label: 'Adventure' },
                { value: 'Young Adult', label: 'Young Adult' },
                { value: 'Teen', label: 'Teen' },
                { value: 'Childrens', label: 'Childrens' },
                { value: 'Nonfiction', label: 'Nonfiction' },
              ]"
            />
          </div>
        </div>

        <div class="blurb-field">
          <h1>Blurb</h1>
          <p class="control">
            <textarea
              v-model="blurbField"
              class="textarea"
              id="review-input"
              placeholder="Write here..."
              style="resize: none"
            ></textarea>
          </p>
        </div>

        <div class="error-text">
          <h1 id="invalid-text"></h1>
        </div>

        <div :class="{ shake: disabledAni }">
          <div class="add-button">
            <router-link to="/adddata/addbook">
              <div class="sign-in-button">
                <button
                  @click="
                    createBook(
                      titleField,
                      authorField,
                      publishedField,
                      blurbField,
                      genres,
                      awardsField
                    )
                  "
                  class="button is-primary is-medium"
                >
                  Add Book
                </button>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div id="popup1" class="overlay">
      <div class="popup">
        <h2 class="title">Add an Image url</h2>
        <a class="close" href="#">&times;</a>
        <div class="content">
          <h6>Please add an image with higher resolution.</h6>

          <div class="img-url-field">
            <p class="control has-icons-left">
              <input
                v-model="imageUrlField"
                class="input is-medium"
                type="text"
                placeholder="Add an image url..."
              />
              <span class="icon is-small is-left">
                <i class="pi pi-globe"></i>
              </span>
            </p>
          </div>

          <div class="add-image">
            <button
              @click="addImageUrl(imageUrlField)"
              class="button is-primary is-medium">
              Add Image
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
import {
  getDocs,
  updateDoc,
  doc,
  collection,
  addDoc,
  query,
  where,
  Timestamp,
  arrayUnion
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useRouter } from "vue-router";
import { ref } from "vue";

const disabledAni = ref(false);
const router = useRouter();
const imgUrl = ref();

var dateTest = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Make queries to the database.
 * @param {*} dbcollection is the database.
 * @param {*} arg          is the left side of the equation.
 * @param {*} arg2         is the right side of the equation.
 * @param {*} func         is the function to deside the equation.
 * @param {*} docs         is the collection of the database.
 */
let queryTool = async (dbcollection, arg, arg2, func, docs) => {
  const q = query(collection(db, dbcollection), where(arg, func, arg2));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc);
    docs.push(doc);
  });
};

function addImageUrl(url) {
  imgUrl.value = url;
}
/**
 * Validate input fields.
 * @param {*} authorName is the author field.
 */
const checkFields = async (title, authorName, date, blurb) => {
  let existsInCol = [];
  let div = document.getElementById("invalid-text");
  div.innerHTML = "";

  if (authorName) {
    await queryTool("author", "name", authorName, "==", existsInCol);
  }

  if (existsInCol.length == 0) {
    div.innerHTML += " Author doesn't exist!";
  }

  if (title && authorName) {
    const q = query(collection(db, "author"), where("name", "==", authorName));
    let authorResult = await getDocs(q);
    authorResult.forEach((doc) => {
      console.log(doc.data())
      doc.data().books.forEach((book) => {
        if(book.title == title) {
          div.innerHTML += " Book already exists!"
        }
      })
    });
  }

  if (!title) {
    div.innerHTML += " Please add a title!";
  }

  if (!dateTest.test(date) || !date) {
    div.innerHTML += " Please add a valid date!";
  }

  if (!blurb) {
    div.innerHTML += " Please add a blurb!";
  }

  if (!imgUrl.value) {
    div.innerHTML += " Please add an image!";
  }
};

async function createBook(title, aName, date, blurb, genres, awards) {
  await checkFields(title, aName, date, blurb);

  if (document.getElementById("invalid-text").innerHTML !== "") {
    console.log("Invalid Fields!");
    warnDisabled();
    return;
  }

  let awardArray = [];
  const dateArray = date.split("-");
  let publishedDate = Timestamp.fromDate(
    new Date(dateArray[0], dateArray[1], dateArray[2])
  );

  if (awards) {
    awardArray = awards.split(",");
  }

  let aid = "";

  const q = query(collection(db, "author"), where("name", "==", aName));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    aid = doc.id;
  });

  const docRef = await addDoc(collection(db, "books"), {
    title: title,
    published: publishedDate,
    avgRating: 0,
    author: { id: aid, name: aName },
    blurb: blurb,
    image_url: imgUrl.value,
    genres: genres,
    awards: awardArray,
  });

  // Add the book to the author.
  const authorRef = doc(db, "author", aid);

  await updateDoc(authorRef, {
    books: arrayUnion({ id: docRef.id, name: title }),
  });

  console.log("Book added!");
  router.push("/");
}

/**
 * Disabled animation on click.
 */
function warnDisabled() {
  disabledAni.value = true;
  setTimeout(() => {
    disabledAni.value = false;
  }, 1500);
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/lato");
.background {
  margin: auto;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  background-color: #d8c3a5;
}

.card-holder {
  text-align: center;
  margin: auto;
  width: 50%;
  padding-top: 5vh;
}
.card {
  text-align: left;
  text-shadow: 0.5px 0px 0px #e98074;
  height: 65vh;
}
.sign-in-text {
  padding-top: 1vh;
  padding-bottom: 3vh;
}

.title-field {
  padding-top: 3vh;
  padding-left: 40vh;
  width: 95%;
}

.author-field {
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.first-published-field {
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.awards-field {
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.blurb-field {
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.genres-field {
  position: absolute;
  width: 30vh;
  left: 5vh;
  padding-top: 5vh;
}

.genres-multiselect {
  --ms-tag-bg: #e98074;
  --ms-tag-color: #f3e8e7;
  --ms-border-color-active: #e98074;
  --ms-option-color-selected: #e98074;
}

.add-button {
  padding-left: 63vh;
}

.error-text {
  position: absolute;
  padding-left: 2.5vh;
  padding-top: 3.5vh;
  width: 60vh;
}

.book-image {
  position: absolute;
  top: 3vh;
  left: 8vh;
}

.bookImg {
  border-radius: 5px;
  height: 34vh;
  width: 23vh;
  box-shadow: 4px 0px 0px #e98074;
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

.plus-icon {
  position: absolute;
  top: 16vh;
  left: 8vh;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

.plus-icon:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
}

.sign-in-button {
  padding-top: 4vh;
}
.button {
  width: 85%;
}

.round-card {
  position: relative;
  padding-left: 48%;
  z-index: 1;
}

.user-icon {
  transform: scale(3);
  background-color: white;
  border-radius: 70%;
  width: 5%;
  position: absolute;
}

.logo {
  position: relative;
  padding-bottom: 1vh;
  margin-right: 9vh;
}

.bookOverflow-img {
  width: 45vh;
}

.subtitle {
  font-weight: 700;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 200ms;
  visibility: hidden;
  opacity: 0;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  z-index: 1;
  position: absolute;
  top: 30vh;
  left: 60vh;
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: absolute;
  transition: all 1s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #e98074;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}

.add-image {
  padding-top: 2vh;
  width: 30vh;
}

/* Animations */
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
