<script setup>
import { useRouter } from "vue-router";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { AisStateResults } from "vue-instantsearch/vue3/es";
import { typesenseConfig } from "../typesense/typesenseClient";

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  var y = t.getFullYear();
  return y;
}
const router = useRouter();

//Goes to book when clicking, and refreshes the site.
async function goToBook(id) {
  await router.push(/book/ + id);
  router.go(0);
}
async function goToAuthor(id) {
  await router.push(/author/ + id);
  router.go(0);
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
    query_by: "title,author,name",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
</script>

<template>
  <ais-instant-search :search-client="searchClient" index-name="combined">
    <ais-configure :hits-per-page.camel="3" />
    <div class="search-field">
      <ais-search-box
        placeholder="Search BookOverflow..."
        submit-title="Submit"
        :autofocus="false"
        :show-loading-indicator="true"
        :class-names="{
          'ais-SearchBox': 'search-box',
          'ais-SearchBox-input': 'search-box input',
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
              <ais-hits v-show="query.length">
                <template v-slot:item="{ item }">
                  <template v-if="item.type == 'book'">
                    <a
                      @click="
                        goToBook(item.id);
                        query = '';
                      "
                      class="results"
                    >
                      <h2 class="subtitle">{{ item.title }}</h2>
                      <div class="result-info">
                        <img class="result-image" :src="item['image_url']" />
                        <h6 class="result-author">
                          <i class="pi pi-user-edit" style="font-size: 1.2rem"></i>
                          Author:
                          {{ item.author.name }}
                        </h6>
                        <i class="pi pi-calendar" style="font-size: 1.2rem"></i> Published:
                        {{ toDateTime(item.published) }}
                        <br />
                        <i class="pi pi-star-fill" style="font-size: 1.2rem"></i> Average
                        Rating: {{ item.avgRating }}
                        <hr /></div></a
                  ></template>
                  <template v-else-if="item.type == 'author'">
                    <a
                      @click="
                        goToAuthor(item.id);
                        query = '';
                      "
                      class="results"
                    >
                      <h2 class="subtitle">{{ item.name }}</h2>
                      <div class="result-info">
                        <img class="result-image" :src="item['image_url']" />
                        <hr /></div
                    ></a>
                  </template>
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
  max-width: 72vh;
  min-width: 72vh;
  box-shadow: 2px 2px 0px #e98074;
}

.results {
  text-shadow: 0.5px 0px 0px #e98074;
}

.result-title {
  font-size: large;
}
.result-image {
  position: absolute;
  flex-basis: 40%;
  min-width: 10vh;
  max-width: 10vh;
  min-height: 15vh;
  max-height: 15vh;
  left: 60vh;
  box-shadow: 2px 2px 0px #e98074;
}

img {
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

img:hover {
  -webkit-transform: scale(1.02);
  transform: scale(1.02);
}

.result-author {
  position: flex;
}

.result-info {
  bottom: 10vh;
  padding-bottom: 5vh;
}

.search-field {
  padding-top: 0.5vh;
  padding-right: 3vh;
  width: 70vh;
}

.ais-SearchBox-submit {
  position: absolute;
  background-color: white;
  border-radius: 0.6vh;
  width: 5vh;
  height: 4vh;
}

.ais-SearchBox-reset {
  position: absolute;
  display: none;
}

.ais-SearchBox-loadingIndicator {
  position: absolute;
  right: 30vh;
  top: 2.5vh;
}
</style>
