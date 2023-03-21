<script setup>
import { useRouter } from "vue-router";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { AisStateResults } from "vue-instantsearch/vue3/es";
import { typesenseConfig } from "../typesense/typesenseClient";

import { getCurrentInstance } from 'vue';

const methodThatForcesUpdate = () => {
  // ...
  const instance = getCurrentInstance();
  instance.proxy.forceUpdate();
  // ...
};

const router = useRouter()

//Goes to book when clicking, and refreshes the site.
async function goToBook(id) {  
  await router.push(/book/ + id);
  router.go(0)
}

console.log(typesenseConfig.url);
console.log(typesenseConfig.port);
console.log(typesenseConfig.searchKey);

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: typesenseConfig.searchKey,
    nodes: [
      {
        host: typesenseConfig.url,
        port: typesenseConfig.port,
        protocol: "http",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "title,author",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
</script>

<template>
  <ais-instant-search :search-client="searchClient" index-name="books">
    <ais-configure :hits-per-page.camel="3" />
    <div class="search-panel">
    
      <ais-search-box
        placeholder="Search BookOverflow..."
        submit-title="Submit"
        reset-title="Reset"
        :autofocus="true"
        :show-loading-indicator="true"
        :class-names="{
          'ais-SearchBox': 'search-box',
          'ais-SearchBox-input': 'search-box input',
          'ais-SearchBox-submitIcon': 'search-icon',
        }"
      >
       <!-- ais-SearchBox: the root element of the widget.
ais-SearchBox-form: the form element.
ais-SearchBox-input: the input element.
ais-SearchBox-submit: the submit button element.
ais-SearchBox-submitIcon: Magnifier icon used with the search input.
ais-SearchBox-reset: the reset button element. 
ais-SearchBox-resetIcon: the reset button icon.
ais-SearchBox-loadingIndicator: the loading indicator element.
ais-SearchBox-loadingIcon: the loading indicator icon. -->
      <template v-slot:submit-icon><i class="pi pi-search"></i></template>
      <!-- <template v-slot:reset-icon><i class="pi pi-reset"></i></template> -->
      <!-- <template v-slot:loading-indicator>⏳</template> -->
      </ais-search-box>
      <div class="search-panel-results">
        <div class="search-bar-results">
          <ais-state-results>
            <template v-slot="{ state: { query } }">
              <ais-hits v-show="query.length > 0">
                <template v-slot:item="{ item }">
                  <a 
                  @click="goToBook(item.id)"
                  class="results">
                    <h2 class="result-title">{{ item.title }}</h2>
                    <img class="result-image" :src="item['image_url']" />
                    <h6 class="result-author">Author: {{ item.author.name }}</h6>
                    <br />
                    Year: {{ item.published }}, Average rating:
                    {{ item.avgRating }}
                    <hr />
                </a>
                </template>
              </ais-hits>
            </template>
          </ais-state-results>
        </div>
      </div>
    </div>
  </ais-instant-search>
</template>

<style>
.search-bar {
  display: flex;
  padding-left: 3vh;
  position: relative;
  flex-grow: 1;
}

.search-panel-results {
  display: flex;
  padding-left: 4vh;
  position: absolute;
  background-color: #f8f7f3;
  font-size: 18px;
  max-width: 70vh;
  min-width: 70vh;
  box-shadow: 2px 2px 0px #e98074;
}

.results {
  text-shadow: 0.5px 0px 0px #e98074;
}

.result-title {
  font-size: large;
}
.result-image {
  position: relative;
  flex-basis: 40%;
  min-width: 10vh;
  max-width: 10vh;
  left: 50vh;
  box-shadow: 2px 2px 0px #e98074;
}

.result-author {
  position: flex;
}

.search-icon {
  position: absolute;
  padding: 1.3vh 1.5vh;
}

.search-box {
  width: 60vh;
}


</style>
