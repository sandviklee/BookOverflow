<template>
  <Search />
  <div class="navbar">
    <div class="logo">
      <router-link to="/">
        <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo" />
      </router-link>
    </div>
    <div class="search-bar has-icon-left">
      <SearchBox></SearchBox>
    </div>
    <div class="vl"></div>
    <div class="the-library">
      <router-link to="/thelibrary">
        <button class="button is-text is-ghost is-medium">
          <i class="pi pi-book" style="font-size: 1.5rem"></i>&ensp;The library
        </button>
      </router-link>
    </div>
    <div class="my-bookshelf">
      <router-link to="/userlist/:id">
        <button class="button is-text is-ghost is-medium">
          <i class="pi pi-book" style="font-size: 1.5rem"></i>&ensp;My Bookshelf
        </button>
      </router-link>
    </div>
    <div v-show="store.uid == 'no user'" class="signup-login">
      <router-link to="/signup">
        <button class="button is-text is-ghost is-medium">
          <i class="pi pi-user" style="font-size: 1.5rem"></i>&ensp;Sign In
        </button>
      </router-link>
    </div>

    <div v-show="store.uid !== 'no user'" class="signup-login">
      <div class="dropdown is-right is-hoverable">
        <div class="dropdown-trigger">
          <button
            class="button is-text is-ghost is-medium"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <span class="icon is-small">
              <i class="pi pi-user" style="font-size: 1.8rem"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <h1 class="welcome-text">Welcome, {{ username }}!</h1>
              <p class="email">You are logged in with: {{ email }}</p>
              <hr />
              <p>Role Permissions: {{ type }}</p>
              <hr />

              <button @click="logOut()" class="button is-danger">
                <i class="pi pi-sign-out" style="font-size: 1.5rem"></i>&ensp; Sign out of
                your account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
// import Search from './Search.vue'
import SearchBox from "./SearchBox.vue";
// import { AisStateResults } from "vue-instantsearch/vue3/es";
import { db } from "../firebase/firebase.js";
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { userStore } from "../stores/UsersStore";
import { useRouter } from "vue-router";

const store = userStore();
const router = useRouter();

const username = ref();
const email = ref();
const type = ref();

function logOut() {
  store.uid = "no user";
  router.push("/");
}

onMounted(async () => {
  const docRef = await doc(db, "users", store.uid);
  const docSnap = await getDoc(docRef);

  if (store.uid !== "no user") {
    let usernameDoc = docSnap.data().username;
    let emailDoc = docSnap.data().email;
    let userType = docSnap.data().type;

    username.value = usernameDoc;
    email.value = emailDoc;
    type.value = userType;
  }
});


</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 30px;
  background-color: rgba(216, 195, 165, 1);
  border-bottom: 1px solid #ddd;
}

.welcome-text {
  font-size: large;
}

.logo img {
  padding-left: 10vh;
  padding-top: 1vh;
  width: 85%;
}

.search-bar {
  display: flex;
  padding-left: 3vh;
  position: relative;
  flex-grow: 1;
}

.search-panel-results {
  display: flex;
  padding-left: 4vh;
  position: absolute;
  background-color: #f8f7f3;
  font-size: 18px;
  max-width: 70vh;
  min-width: 70vh;
  box-shadow: 2px 2px 0px #e98074;
}

.results {
  text-shadow: 0.5px 0px 0px #e98074;
}

.result-title {
  font-size: large;
}
.result-image {
  position: relative;
  flex-basis: 40%;
  min-width: 10vh;
  max-width: 10vh;
  left: 50vh;
  box-shadow: 2px 2px 0px #e98074;
}

.result-author {
  position: flex;
}

.vl {
  border-left: 2.5px solid rgb(0, 0, 0);
  height: 45px;
  padding-right: 10px;
}

.search-icon {
  position: absolute;
  padding: 1.3vh 1.5vh;
}

.search-icon {
  position: absolute;
  padding: 1.3vh 1.5vh;
}

.search-bar input[type="text"] {
  margin: auto;
  height: 48px;
  width: 70vh;
  padding: 0 40px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 0px #e98074;
  background-color: #edeae5;
  font-size: 16px;
  flex-grow: 1;
}

.search-bar button {
  height: 48px;
  padding-right: 2vh;
  width: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 0px #e98074;
  background-color: #edeae5;
  color: #8e8d8a;
  font-size: 16px;
}

.email {
  font-weight: bold;
}

.dropdown-menu {
  box-shadow: 2px 2px 0px #e98074;
}

.user-lists img {
  height: 40px;
  cursor: pointer;
}

/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: ass 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3 ease-in;
}
</style>
