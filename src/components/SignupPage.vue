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
          <h1>SIGN INTO YOUR ACCOUNT</h1>
        </div>
        
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" type="email" placeholder="Username">
            <span class="icon is-small is-left">
              <i class="pi pi-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input is-medium" type="password" placeholder="Password">
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

        <div class="sign-in-button">
          <button class="button is-primary is-medium">SIGN IN</button>
        </div>
        
        <div class="new-account-button">
          <router-link to="/signup/register">
            <button class="button is-text is-ghost is-medium"><i class="pi pi-user-plus" style="font-size: 1.5rem"></i>&ensp;Create a new account</button>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  //import * as firebase from 'firebase/app';
  //import 'firebase/database';
  
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