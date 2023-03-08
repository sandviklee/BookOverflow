<template>
  <div class="navbar">
    <div class="logo">
      <router-link to="/">
        <img src="/src/assets/BookOverflow/logo.png" alt="BookOverflow Logo" />
      </router-link>
    </div>
    <div class="search-bar has-icon-left">
      <ais-instant-search :search-client="searchClient" index-name="books">
        <ais-configure :hits-per-page.camel="8" />
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
      <!-- <form>
        <span class="search-icon">
          <i class="pi pi-search"></i>
        </span>

        <input type="text" v-model="searchTerm" placeholder="Search BookOverflow..." />
        <button type="submit" @click.prevent="search">{{ "All" }}</button>
      </form> -->
    </div>
    <div class="vl"></div>
    <div class="my-bookshelf">
      <router-link to="/userlist/:id">
        <button class="button is-text is-ghost is-medium">
          <i class="pi pi-book" style="font-size: 1.5rem"></i>&ensp;My Bookshelf
        </button>
      </router-link>
    </div>
    <div class="signup-login">
      <router-link to="/signup">
        <button class="button is-text is-ghost is-medium">
          <i class="pi pi-user" style="font-size: 1.5rem"></i>&ensp;Sign In
        </button>
      </router-link>
    </div>
    <div class="menu">
      <button class="button is-text is-ghost is-medium">
        <i class="pi pi-bars" style="font-size: 2rem"></i>
      </button>
    </div>
  </div>
</template>

<script>
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "gruppe29apikey", // Be sure to use an API key that only allows searches, in production
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  //  filterBy is managed and overridden by InstantSearch.js. To set it, you want to use one of the filter widgets like refinementList or use the `configure` widget.
  additionalSearchParameters: {
    query_by: "title,authors",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default {
  data() {
    return {
      searchTerm: "",
      buttonText: "",
      searchClient,
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 30px;
  background-color: rgba(216, 195, 165, 1);
  border-bottom: 1px solid #ddd;
}

.logo img {
  padding-left: 10vh;
  padding-top: 1vh;
  width: 85%;
}

.search-bar {
  display: flex;
  padding-left: 10vh;
  align-items: center;
  position: relative;
  flex-grow: 1;
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
  width: 65vh;
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

.user-lists img {
  height: 40px;
  cursor: pointer;
}
</style>
