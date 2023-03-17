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
        <div class="title-field">
          <p class="control has-icons-left">
            <input
              class="input is-medium"
              type="text"
              placeholder="Write title here..."
            />
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>

        <div class="author-field">
          <p class="control has-icons-left">
            <input
              class="input is-medium"
              type="text"
              placeholder="Write name here..."
            />
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>

        <div class="first-published-field">
          <p class="control has-icons-left">
            <input
              class="input is-medium"
              type="text"
              placeholder="DD.MM.YYYY"
            />
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>

        <div class="awards-field">
          <p class="control has-icons-left">
            <input
              class="input is-medium"
              type="text"
              placeholder="<Price>, <Price>, <Price>,..."
            />
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>

        <div class="blurb-field">
          <p class="control">
            <textarea
              v-model="reviewField"
              class="textarea"
              id="review-input"
              placeholder="Write here..."
            ></textarea>
          </p>
        </div>

        <Multiselect
          v-model="value"
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

        <div class="add-button">
          <router-link to="/adddata/addbook">
            <div class="sign-in-button">
              <button class="button is-primary is-medium">Add Book</button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Multiselect from "@vueform/multiselect";
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
