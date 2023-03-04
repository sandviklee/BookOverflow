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
        
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" type="email" placeholder="Username">
            <span class="icon is-small is-left">
              <i class="pi pi-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-medium" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="pi pi-envelope"></i>
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
        <div class="field">
          <p class="control has-icons-left">
            <input class="input is-medium" type="password" placeholder="Confirm Password">
            <span class="icon is-small is-left">
              <i class="pi pi-lock"></i>
            </span>
          </p>
        </div>

        <div class="create-button">
          <button class="button is-primary is-medium">CREATE ACCOUNT</button>
        </div>
        
        <div class="back-button">
          <router-link to="/signup/">
            <button class="button is-text is-ghost is-medium"><i class="pi pi-arrow-circle-left" style="font-size: 1.5rem"></i>&ensp;Already have an account? Login</button>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>
    
    
<script>
import { ref, onMounted } from 'vue';
//import * as firebase from 'firebase/app';
//import 'firebase/database';

export default {
    name: 'SignupRegisterPage',
    setup() {
    const results = ref([]);

    onMounted(() => {
        const term = ''; // replace with your search term
        //const database = firebase.database();
        //const ref = database.ref('posts');

    });

    return { results };
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
  padding-top: 6vh;
  padding-bottom: 1vh;

}
.field {
  width: 70%;
  margin: auto;
  padding: 6px;
}
.create-button {
  padding-top: 1vh;
}
.button {
  width: 66%;
}

.back-button {
  padding-top: 1vh;
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