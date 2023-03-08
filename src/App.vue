<template>
  <div id="app">
    <navbar v-if="!$route.meta.hideNavbar" @search="performSearch"></navbar>
    <router-view />
  <!-- <div class="container">
      <ais-instant-search :search-client="searchClient" index-name="books">
        <ais-configure :hits-per-page.camel="8" />
        <div class="search-panel">
          <div class="search-panel__filters"></div>

          <div class="search-panel__results">
            <div class="searchbox">
              <ais-search-box placeholder="Type here to search..." />
            </div>
            <ais-hits>
              <template v-slot:item="{ item }">
                <div>
                  <h2>{{ item.title }}</h2>
                  <img :src="item['image_url']" />
                  Author: {{ item.authors[0] }}
                  Year: {{ item.publication_year }}
                  Average rating: {{ item.average_rating }}
                </div>
              </template>
            </ais-hits>

            <div class="pagination">
              <ais-pagination />
            </div>
          </div>
        </div>
      </ais-instant-search>
    </div> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
// import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

// const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
//   server: {
//     apiKey: "gruppe29apikey", // Be sure to use an API key that only allows searches, in production
//     nodes: [
//       {
//         host: "localhost",
//         port: "8108",
//         protocol: "http",
//       },
//     ],
//   },
//   // The following parameters are directly passed to Typesense's search API endpoint.
//   //  So you can pass any parameters supported by the search endpoint below.
//   //  queryBy is required.
//   //  filterBy is managed and overridden by InstantSearch.js. To set it, you want to use one of the filter widgets like refinementList or use the `configure` widget.
//   additionalSearchParameters: {
//     query_by: "title,authors",
//   },
// });
// const searchClient = typesenseInstantsearchAdapter.searchClient;

export default {
  name: 'App',
  components: {
    Navbar,
  },
  // data() {
  //   return {
  //     searchClient,
  //   };
  // },
}
</script>