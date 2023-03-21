<template>
  <div class="background">
    <div class="logo">
      <router-link to="/">
        <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo" />
      </router-link>
    </div>
    <div class="review-box">
      <form class="box">
        <div class="top-text">
          <h1 class="title">
            <i class="pi pi-pencil" style="font-size: 2rem"></i> Leave a review
          </h1>
        </div>
        <article class="media">
          <div class="media-content">
            <div class="review-title-field">
              <h1>Title*</h1>
              <input
                v-model="titleField"
                class="input"
                id="title-input"
                type="text"
                placeholder="Add a review title..."
              />
            </div>

            <div class="field">
              <h1>Review*</h1>
              <p class="control">
                <textarea
                  v-model="reviewField"
                  class="textarea"
                  id="review-input"
                  placeholder="Add a BookOverflow review..."
                ></textarea>
              </p>
            </div>

            <div class="review-stars-field">
              <h2>Star Rating:</h2>

              <input
                v-model="count"
                class="input"
                type="text"
                id="rating-input"
                readonly
              />
              <div class="button-up-down">
                <button
                  type="button"
                  v-bind:disabled="count > 4"
                  @click="increment"
                  class="button is-ghost is-small"
                >
                  <i class="pi pi-chevron-up" style="font-size: 1.2rem"></i>
                </button>
                <button
                  type="button"
                  v-bind:disabled="count <= 1"
                  @click="decrement"
                  class="button is-ghost is-small"
                >
                  <i class="pi pi-chevron-down" style="font-size: 1.2rem"></i>
                </button>
              </div>
            </div>

            <nav class="level">
              <div class="level-item">
                <button
                  type="button"
                  @click="createReview(titleField, count, reviewField)"
                  class="button is-link"
                >
                  Submit Review
                </button>
              </div>
            </nav>
            <h6 id="done-text"></h6>
          </div>
        </article>
      </form>
      <div class="review-box"></div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { userStore } from "../stores/UsersStore";

const route = useRoute();
const router = useRouter();
const store = userStore();
const count = ref(1);

let book = "";
book = route.params.id;

/**
 * Increments the review star value.
 */
function increment() {
  count.value++;
}

/**
 * Decrements the review star value.
 */
function decrement() {
  count.value--;
}

/**
 * Creates the review.
 * @param {*} title  is the review title.
 * @param {*} rating is the review rating.
 * @param {*} review is the review itself.
 */
function createReview(title, rating, review) {
  addDoc(collection(db, "reviews"), {
    book: {
      id: book,
    },
    rating: rating,
    title: title,
    review: review,
    user: {
      id: store.uid,
    },
  });
  document.getElementById("done-text").innerHTML = "Review created!";
  router.push("/book/" + book);
}
</script>

<style scoped>
.background {
  margin: auto;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  background-color: #d8c3a5;
}
.top-text {
  text-align: center;
  padding-bottom: 5vh;
}

.box {
  padding-top: 5vh;
  width: 60%;
  position: absolute;
}

.review-box {
  position: inherit;
  padding-left: 35vh;
  padding-top: 2vh;
}

.review-box {
  position: relative;
  top: 1vh;
}

.logo {
  margin: auto;
  padding-top: 15vh;
  width: 55vh;
  padding-right: 1vh;
}

.review-title-field {
  padding-bottom: 1vh;
}

.review-stars-field {
  position: inherit;
  padding-left: 35vh;
  width: 64vh;
  padding-bottom: 2vh;
}
</style>
