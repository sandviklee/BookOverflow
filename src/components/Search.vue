<template>
  <ais-instant-search
    :search-client="searchClient"
    :search-function="newSearch"
    index-name="books"
  >
    <ais-configure :hits-per-page.camel="1" />
    <ais-search-box class="searchbox" placeholder="Type here to search..." />
    <!-- <div class="search-panel">
          <div class="search-panel__filters"></div>

          <div class="search-panel__results">
            <div class="searchbox">
              <ais-hits>
                <template v-slot:item="{ item }">
                  <div>
                    <h2>{{ item.title }}</h2>
                    <img :src="item['image_url']" />
                    Author: {{ item.authors[0] }} Year:
                    {{ item.publication_year }} Average rating: {{ item.average_rating }}
                  </div>
                </template>
              </ais-hits>
            </div> -->
    <!-- <div class="pagination">
              <ais-pagination />
            </div> -->
    <!-- </div>
        </div> -->
  </ais-instant-search>
</template>

<script setup>
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";
import { AisStateResults } from "vue-instantsearch/vue3/es";
import { db } from "../firebase/firebase.js";
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
const router = useRouter();

const type = ref();

onMounted(async () => {});

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "gruppe29apikey",
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,author",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

// const typesense_client = new Typesense.Client({
//   nodes: [
//     {
//       host: "localhost",
//       port: "8108",
//       protocol: "http",
//     },
//   ],
//   apiKey: "gruppe29apikey",
//   additionalSearchParameters: {
//     query_by: "title,author",
//   },
//   connectionTimeoutSeconds: 2,
// });

// async function getTopList(number) {
//   let searchParameters = {
//     q: "*",
//     query_by: "title",
//     sort_by: "avgRating:desc",
//     limit_hits: number,
//   };

//   await typesense_client
//     .collections("books")
//     .documents()
//     .search(searchParameters)
//     .then(function (searchResults) {
//       console.log(searchResults);
//     });
// }
</script>
