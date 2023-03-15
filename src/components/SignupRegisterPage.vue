<template>
<div class="background">
    <div class="card-holder">
      <div class="logo">
          <router-link to="/">
              <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo">
          </router-link>
      </div>

      <div class="round-card">
        <div class="user-icon">
          <i class="pi pi-user-plus"></i>
        </div>
      </div>

      <div class="card">
        <div class="create-text">
          <h1>CREATE YOUR BOOKOVERFLOW ACCOUNT</h1>
        </div>
        <div class="username-text">
          <h6 id="invalid-text"></h6>
        </div>
        
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="usernameField" class="input is-medium" type="email" placeholder="Username">
            <span class="icon is-small is-left">
              <i class="pi pi-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="emailField" class="input is-medium" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="pi pi-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="passwordField" class="input is-medium" type="password" placeholder="Password">
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="passwordConfirmField" class="input is-medium" type="password" placeholder="Confirm Password">
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>
        
        <div :class="{ shake: disabledAni }">
          <div class="create-button">
            <button
            @click="createAccount(usernameField, emailField, passwordField, passwordConfirmField);"
            class="button is-primary is-medium">CREATE ACCOUNT</button>
          </div>
        </div>

        
        <div class="back-button">
          <router-link to="/signup/">
            <button class="button is-text is-ghost is-medium"><i class="pi pi-arrow-circle-left" style="font-size: 1.5rem"></i>&ensp;Have an account? Login</button>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>
    
    
<script setup>
import { db } from '../firebase/firebase.js'
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore'; 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { userStore } from '../stores/UsersStore'
import { ref } from 'vue'

var formatUsername = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
var formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const disabledAni = ref(false)
const auth = getAuth();
const router = useRouter();
const store = userStore();

/**
 * Make queries to the database.
 * @param {*} dbcollection is the database.
 * @param {*} arg          is the left side of the equation.
 * @param {*} arg2         is the right side of the equation.
 * @param {*} func         is the function to deside the equation.
 * @param {*} docs         is the collection of the database.
 */
let queryTool = async (dbcollection, arg, arg2, func, docs) => {
  const q = query(collection(db, dbcollection), where(arg, func, arg2))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc);
    docs.push(doc)
  })
}

/**
 * Validate input fields.
 * @param {*} username        is the username field.
 * @param {*} email           is the email field.
 * @param {*} password        is the password field.
 * @param {*} passwordConfirm is the passwordConfirm field. 
 */
const checkFields = async (username, email, password, passwordConfirm) => { 
  let existsInCol = []
  let div = document.getElementById("invalid-text")
  div.innerHTML = ""

  if (username) {
    await queryTool("users", "username", username, "==", existsInCol)
  }
  
  if (email) {
    await queryTool("users", "email", email, "==", existsInCol)
  }

  if (existsInCol.length !== 0) {
    div.innerHTML += " Username and/or Email already exists!"
  }
  
  if (formatUsername.test(username) || !username) {
    div.innerHTML += " Invalid Username."
  }

  if (!formatEmail.test(email) || !email) {
    div.innerHTML += " Invalid Email." 
  } 

  if ((password != passwordConfirm) || !password || !passwordConfirm) {
    div.innerHTML += " Invalid Password." 
  }
}

/**
 * Creates User account and signs you into the website.
 * @param {*} username        is the username field.
 * @param {*} email           is the email field.
 * @param {*} password        is the password field.
 * @param {*} passwordConfirm is the passwordConfirm field.
 */
async function createAccount(username, email, password, passwordConfirm) {
  await checkFields(username, email, password, passwordConfirm);
  
  /**
   * If there is any text written in the invalid field, you should'nt be signed in.
   */
  if (document.getElementById("invalid-text").innerHTML !== "") {
    console.log("Invalid Fields!");
    warnDisabled()
    return
  }

  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      username: username,
      type: "user"
    })

    //Change page to homescreen and emit the user to the rest of the app through Pinia store.
    if (user) {
      console.log(user, " has been created!");
      //Stores the user.uid in the global store.
      store.$patch({
        uid: user.uid,
      })
      //Changes the page to homescreen.
      router.push('/')
    }
    
  })
  .catch((error) => {
    warnDisabled()
    const errorCode = error.code;
    const errorMessage = error.message;
    let div = document.getElementById("invalid-text")
    div.innerHTML += errorMessage
  });
}

/**
 * Disabled animation on click.
 */
function warnDisabled() {
  disabledAni.value = true
  setTimeout(() => {
    disabledAni.value = false
  }, 1500)
}

</script>
    
<style scoped>
@import url('https://fonts.cdnfonts.com/css/lato');
.background {
  margin: auto;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  background-color: #D8C3A5;
}

.card-holder {
  text-align: center;
  margin: auto;
  width: 25%;
  padding-top: 20vh;
}
.card {
  height: 50vh;
}
.create-text {
  padding-top: 4.5vh;
  padding-bottom: 0.1vh;

}
.username-text {
  text-align: left;
  font-size: 13px;
  width: 70%;
  margin: auto;
  padding-left: 1vh;
}
.field {
  width: 70%;
  margin: auto;
  padding: 10px;
}
.create-button {
  padding-top: 0vh;
}
.button {
  width: 66%;
}

.back-button {
  padding-top: 0.1vh;
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
  padding-bottom: 4vh;
  margin-right: 9vh;
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