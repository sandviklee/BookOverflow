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
          <i class="pi pi-pencil" style="font-size: 1.5rem"></i>ADD A NEW AUTHOR
        </h1>
      </div>

      <div class="card">
        <a class="author-image" href="#popup1">
          <h1>Cover</h1>
          <div class="plus-icon">
            <i 
              class="pi pi-plus-circle" 
              href="#popup1" 
              style="font-size: 7vh;"
            ></i>
          </div>
          
          <img
            class="authorImg"
            :src="imgUrl"
          />
        </a>
        <div class="name-field">
          <h1><i class="pi pi-book"></i> Name</h1>
          <p class="control">
            <input
              v-model="nameField"
              class="input is-medium"
              type="text"
              placeholder="Write Author name here..."
            />
          </p>
        </div>

        <div class="born-field">
          <h1><i class="pi pi-calendar"></i> Born</h1>
          <p class="control">
            <input
              v-model="bornField"
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


        <div class="about-field">
          <h1>About</h1>
          <p class="control">
            <textarea
              v-model="aboutField"
              class="textarea"
              id="review-input"
              placeholder="Write here..."
            ></textarea>
          </p>
        </div>

        <div class="error-text">
          <h1 id="invalid-text"></h1>
        </div>

        <div :class="{ shake: disabledAni }">
          <div class="add-button">
            <router-link to="/adddata/addauthor">
              <div class="sign-in-button">
                <button
                  @click="
                    createAuthor(
                      nameField,
                      bornField,
                      awardsField,
                      aboutField          
                    )
                  "
                  class="button is-primary is-medium"
                >
                  Add Author
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
import { 
  getDocs,
  collection, 
  addDoc, 
  query, 
  where, 
  Timestamp 
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
  imgUrl.value = url
}
/**
 * Validate input fields.
 * @param {*} authorName is the author field.
 */
const checkFields = async (name, born, about) => {
  let existsInCol = [];
  let div = document.getElementById("invalid-text");
  div.innerHTML = "";

  if (name) {
    await queryTool("author", "name", name, "==", existsInCol);
  }

  if (existsInCol.length != 0) {
    div.innerHTML += " Author already exists!";
  }

  if (!name) {
    div.innerHTML += " Please add a name for author!";
  }

  if (!dateTest.test(born) || !born) {
    div.innerHTML += " Please add a valid date for field 'born'!";
  }

  if (!about) {
    div.innerHTML += " Please add a text about author!";
  }

  if (!imgUrl.value) {
    div.innerHTML += " Please add an image!";
  }
};

async function createAuthor(name, born, awards, about) { 
  await checkFields(name, born, about);

  if (document.getElementById("invalid-text").innerHTML !== "") {
    console.log("Invalid Fields!");
    warnDisabled();
    return;
  }

  let awardArray = []
  let bookArray = []
  const dateArray = born.split("-")
  let dateBorn = Timestamp.fromDate(new Date(dateArray[0], dateArray[1], dateArray[2]))

  if (awards) {
    awardArray = awards.split(",")
  } 

  const docRef = await addDoc(collection(db, "author"), {
    name: name,
    born: dateBorn,
    books: bookArray,
    about: about,
    image_url: imgUrl.value,
    awards: awardArray,
    avgRating: 2.5 // workaround for typesense - TODO: replace with something proper
  });

  console.log("Author added!");
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
  height: 55vh;
}
.sign-in-text {
  padding-top: 1vh;
  padding-bottom: 3vh;
}

.name-field {
  padding-top: 3vh;
  padding-left: 40vh;
  width: 95%;
}

.born-field {
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.awards-field{
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.about-field {
  width: 95%;
  padding-top: 1vh;
  padding-left: 40vh;
}

.add-button {
  padding-left: 70vh;
}

.error-text {
  position: absolute;
  padding-left: 2.5vh;
  padding-top: 3.5vh;
  width: 60vh;
}


.author-image {
  position: absolute;
  top: 3vh;
  left: 8vh;
}

.authorImg {
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

.authorImg:hover {
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
  left: 70vh;
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
