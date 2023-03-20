<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { AisStateResults } from "vue-instantsearch/vue3/es";
import { typesenseConfig } from "../typesense/typesenseClient";

console.log(typesenseConfig.url)
console.log(typesenseConfig.port)
console.log(typesenseConfig.searchKey)

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
      <ais-search-box>
        <template v-slot="{ currentRefinement, isSearchStalled, refine }">
          <span class="search-icon">
            <i class="pi pi-search"></i>
          </span>

          <input
            type="text"
            :value="currentRefinement"
            @input="refine($event.currentTarget.value)"
            placeholder="Search BookOverflow..."
          />
        </template>
      </ais-search-box>
      <div class="search-panel-results">
        <div class="search-bar-results">
          <ais-state-results>
            <template v-slot="{ state: { query } }">
              <ais-hits v-show="query.length > 0">
                <template v-slot:item="{ item }">
                  <div class="results">
                    <h2 class="result-title">{{ item.title }}</h2>
                    <h6 class="result-author">Author: {{ item.author[0] }}</h6>
                    <img class="result-image" :src="item['image_url']" />
                    <br />
                    Year: {{ item.publication_year }}, Average rating:
                    {{ item.average_rating }}
                    <hr />
                  </div>
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

.vl {
  border-left: 2.5px solid rgb(0, 0, 0);
  height: 45px;
  padding-right: 10px;
}

.search-icon {
  position: absolute;
  padding: 1.3vh 1.5vh;
}

.search-icon {
  position: absolute;
  padding: 1.3vh 1.5vh;
}

.search-bar input[type="text"] {
  margin: auto;
  height: 48px;
  width: 70vh;
  padding: 0 40px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 0px #e98074;
  background-color: #edeae5;
  font-size: 16px;
  flex-grow: 1;
}

.search-bar button {
  height: 48px;
  padding-right: 2vh;
  width: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 0px #e98074;
  background-color: #edeae5;
  color: #8e8d8a;
  font-size: 16px;
}
</style>
