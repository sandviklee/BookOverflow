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
          <i class="pi pi-users"></i>
        </div>
      </div>

      <div class="card">
        <div class="sign-in-text">
          <h1 class="subtitle">SIGN INTO YOUR ACCOUNT</h1>
        </div>

        <div class="username-text">
          <h6 id="invalid-text"></h6>
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

        <div class="sign-in-checkbox">
          <label class="checkbox">
            <input type="checkbox">
            Remember me
          </label>
        </div>

        <div :class="{ shake: disabledAni }">
          <div class="sign-in-button">
            <button 
            @click="signInAccount(emailField, passwordField);"
            class="button is-primary is-medium">SIGN IN</button>
          </div>
        </div>

        
        <div class="new-account-button">
          <router-link to="/signup/register">
            <transition name="fade">
              <button class="button is-text is-ghost is-medium"><i class="pi pi-user-plus" style="font-size: 1.5rem"></i>&ensp;Create a new account</button>
            </transition>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script setup>
import { db } from '../firebase/firebase.js'
import { getDocs, collection, query, where } from 'firebase/firestore'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { userStore } from '../stores/UsersStore'
import { ref } from 'vue'

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
 * @param {*} email           is the email field.
 */
 const checkFields = async (email) => { 
  let existsInCol = []
  let div = document.getElementById("invalid-text")
  div.innerHTML = ""

  if (email) {
    await queryTool("users", "email", email, "==", existsInCol)
  }

  if (existsInCol.length == 0) {
    div.innerHTML += " Email doesnt exist!"
  }

  if (!formatEmail.test(email) || !email) {
    div.innerHTML += " Invalid Email." 
  } 
}

/**
 * Signs you in to an account.
 * @param {*} email    is the email field.
 * @param {*} password is the password field. 
 */
async function signInAccount(email, password) {
  await checkFields(email, password);
  
  if (document.getElementById("invalid-text").innerHTML !== "") {
    console.log("Invalid Fields!");
    warnDisabled()
    return
  }
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    if (user) {
      console.log(user, " has been logged in!");
      //Updates the pinia store, the global user.uid is set to the signed in user.
      store.$patch({
        uid: user.uid,
      })
      //Changes the page to the home page.
      router.push('/')
    }

  })
  .catch((error) => {
    
    const errorMessage = error.message;
    let div = document.getElementById("invalid-text")
    div.innerHTML += errorMessage
    warnDisabled()
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
.sign-in-text {
  padding-top: 6vh;
  padding-bottom: 3vh;

}
.field {
  width: 70%;
  margin: auto;
  padding: 10px;
}

.sign-in-checkbox {
  text-align: left;
  padding-left: 9vh;
  padding-top: 1vh;
}
.sign-in-button {
  padding-top: 4vh;
}
.button {
  width: 66%;
}

.new-account-button {
  padding-top: 2vh;
}
.username-text {
  text-align: left;
  font-size: 13px;
  width: 70%;
  margin: auto;
  padding-left: 1vh;
  color: red;
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