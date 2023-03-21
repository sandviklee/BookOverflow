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

      <div class="round-card">
        <div class="user-icon">
          <i class="pi pi-plus" style="font-size: 0.9rem"></i>
        </div>
      </div>

      <div class="card">
        <div class="sign-in-text">
          <h1 class="subtitle">What do you want to add?</h1>
        </div>

        
        <router-link to="/adddata/addbook">
          <div class="sign-in-button">
            <button class="button is-primary is-medium">Add Book</button>
          </div>
        </router-link>

        <router-link to="/adddata/addauthor">
          <div class="sign-in-button">
            <button class="button is-primary is-medium">Add Author</button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
  width: 25%;
  padding-top: 20vh;
}
.card {
  height: 35vh;
}
.sign-in-text {
  padding-top: 6vh;
  padding-bottom: 3vh;
}

.sign-in-button {
  padding-top: 2vh;
}
.button {
  width: 66%;
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
