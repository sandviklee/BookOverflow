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

        <div class="create-button">
            <button
            @click="createAccount(usernameField, emailField, passwordField, passwordConfirmField)"
            class="button is-primary is-medium">CREATE ACCOUNT</button>
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
    
    
<script>
import { db } from '../firebase/firebase.js'
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from 'vue';

var formatUsername = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
var formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const auth = getAuth();

/**
 * Make queries to the database.
 * @param {*} dbcollection 
 * @param {*} arg 
 * @param {*} arg2 
 * @param {*} func 
 * @param {*} docs 
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
 * @param {*} username 
 * @param {*} email 
 * @param {*} password 
 * @param {*} passwordConfirm 
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

export default {
    name: "SignupRegisterPage",
    currentUser: 'SusUser',
    methods: {
      /**
       * Creates User account for BookOverflow
       * @param {*} username 
       * @param {*} email 
       * @param {*} password 
       * @param {*} passwordConfirm 
       */
      async createAccount(username, email, password, passwordConfirm) {
        await checkFields(username, email, password, passwordConfirm);
  
        if (document.getElementById("invalid-text").innerHTML !== "") {
          console.log("Invalid Fields!");
          return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 
          
          const user = userCredential.user;
          
          await setDoc(doc(db, "users", user.uid), {
            email: email,
            username: username
          })

          console.log(user, " has been created!");
          //Change page to homescreen.
          if (user) {
            this.currentUser = user;
            this.$router.push('/')
          }
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      },
    },
};
    
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

</style>