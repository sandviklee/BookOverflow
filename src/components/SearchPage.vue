<template>
  <header>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1> 
            Search page <br>
            Coming soon! </h1>
        </div>
      </div>
    </div>

  </header>
</template>
  
  
<script>
  import { ref, onMounted } from 'vue';
  //import * as firebase from 'firebase/app';
  //import 'firebase/database';
  

  export default {
    name: 'SearchPage',
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
  
<style>

@import url('https://fonts.cdnfonts.com/css/lato');
* {
  font-family: "lato";
}

header {
  padding-top: 5vh;
  text-align: center;
  font-weight:700;
  text-shadow: 1px 0.5px 0px #E98074;
}
</style>
