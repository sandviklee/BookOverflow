<template>
  <div class="background">
    <div class="card-holder">
      <div class="logo">
        <router-link to="/">
          <img
            src="/src/assets/BookOverflow/logo.png"
            alt="BookOverflow Logo"
          />
        </router-link>
      </div>

      <div class="sign-in-text">
        <h1 class="subtitle">
          <i class="pi pi-pencil" style="font-size: 1.5rem"></i>ADD A NEW BOOK
          TO BOOKOVERFLOW
        </h1>
      </div>

      <div class="card">
        <div class="book-image">
          <img
            class="bookImg"
            src="../assets/BookFormat/Author/Francis_Scott_Fitzgerald/The_Great_Gatsby.png"
          />
        </div>

        <div class="title-field">
          <p class="control has-icons-left">
            <input
              v-model="titleField"
              class="input is-medium"
              type="text"
              placeholder="Write title here..."
            />
            <span class="icon is-small is-left">
              <i class="pi pi-book"></i>
            </span>
          </p>
        </div>

        <div class="author-field">
          <p class="control has-icons-left">
            <input
              v-model="authorField"
              class="input is-medium"
              type="text"
              placeholder="Write author name here..."
            />
            <span class="icon is-small is-left">
              <i class="pi pi-user-edit"></i>
            </span>
          </p>
        </div>

        <div class="first-published-field">
          <p class="control has-icons-left">
            <input
              v-model="publishedField"
              class="input is-medium"
              type="text"
              placeholder="DD.MM.YYYY"
            />
            <span class="icon is-small is-left">
              <i class="pi pi-calendar"></i>
            </span>
          </p>
        </div>

        <div class="awards-field">
          <p class="control has-icons-left">
            <input
              v-model="awardsField"
              class="input is-medium"
              type="text"
              placeholder="<Prize>, <Prize>, <Prize>,..."
            />
            <span class="icon is-small is-left">
              <i class="pi pi-globe"></i>
            </span>
          </p>
        </div>

        <div class="blurb-field">
          <p class="control">
            <textarea
              v-model="blurbField"
              class="textarea"
              id="review-input"
              placeholder="Write here..."
            ></textarea>
          </p>
        </div>

        <Multiselect
          v-model="genres"
          mode="tags"
          :close-on-select="false"
          :searchable="true"
          :create-option="true"
          :options="[
            { value: 'Heidi', label: 'Heidi' },
            { value: 'Simon', label: 'Simon' },
            { value: 'Anta', label: 'Anta' },
          ]"
        />

        <div class="error-text">
          <h1 id="invalid-text" class="subtitle"></h1>
        </div>

        <div class="add-button">
          <router-link to="/adddata/addbook">
            <div class="sign-in-button">
              <button
                @click="
                  createBook(
                    titleField,
                    authorField,
                    publishedField,
                    blurbField
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
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
import { getDocs, collection, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useRouter } from "vue-router";
import { userStore } from "../stores/UsersStore";
import { ref } from "vue";

const router = useRouter();

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

/**
 * Validate input fields.
 * @param {*} authorName           is the email field.
 */
const checkFields = async (authorName) => {
  let existsInCol = [];
  let div = document.getElementById("invalid-text");
  div.innerHTML = "";

  if (authorName) {
    await queryTool("author", "name", authorName, "==", existsInCol);
  }

  if (existsInCol.length == 0) {
    div.innerHTML += " Author doesnt exist!";
  }
};

async function createBook(title, aName, date, blurb) {
  await checkFields(aName);

  if (document.getElementById("invalid-text").innerHTML !== "") {
    console.log("Invalid Fields!");
    return;
  }

  let aid = "";

  const q = query(collection(db, "author"), where("name", "==", aName));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    aid = doc.id;
  });

  const docRef = await addDoc(collection(db, "books"), {
    title: title,
    date: date,
    author: { id: aid, name: aName },
    blurb: blurb,
  });

  console.log("Book added!");
  router.push("/");
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
  height: 70vh;
}
.sign-in-text {
  padding-top: 1vh;
  padding-bottom: 3vh;
}
.book-image {
  position: absolute;
  top: 40vh;
}

.bookImg {
  border-radius: 5px;
  height: 30vh;
  width: 20vh;
  box-shadow: 4px 0px 0px #e98074;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

.sign-in-button {
  padding-top: 4vh;
}
.button {
  width: 25%;
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
</style>
