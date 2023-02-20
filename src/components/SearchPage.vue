<template>
    <div>
      <h1>Search Results</h1>
      <ul>
        <li v-for="result in results" :key="result.id">
          {{ result.title }}
        </li>
      </ul>
    </div>
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
        ref.orderByChild('title')
          .startAt(term)
          .endAt(term + '\uf8ff')
          .on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
              results.value = Object.values(data);
            }
          });
      });
  
      return { results };
    },
  };
  </script>
  