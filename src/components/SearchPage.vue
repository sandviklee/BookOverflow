<template>
    <h1>Search Results</h1>
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
  