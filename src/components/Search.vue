<template>
<slot>
</slot>

</template>

<script setup>
import Typesense from "typesense";
import { ref, onMounted, provide } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const type = ref();

onMounted(async () => {});

const adminKey = "OVDlEoP7Ix6oaZ4LAYL7an7qRhJtREV9";
provide("adminKey",adminKey)

const searchKey = "eJ1tiTcH7NFixXyUONF0rEsQHQPpI62R";
provide("searchKey", searchKey)

const typesenseURL = new URL("http://TDT4140-29.idi.ntnu.no");
const typesensePort = 8108;
const typesenseURLwithPort = new URL(typesensePort, typesenseURL);
const typesenseHealth = new URL("/health", typesenseURLwithPort);


provide("searchClient", searchClient)

const listClient = new Typesense.Client({
  nodes: [
    {
      host: typesenseURL,
      port: typesensePort,
      protocol: "http",
    },
  ],
  apiKey: searchKey,
  additionalSearchParameters: {
    query_by: "title,author",
  },
  connectionTimeoutSeconds: 2,
});
provide("listClient", listClient)

async function getTopList(number) {
  let searchParameters = {
    q: "*",
    query_by: "title",
    sort_by: "avgRating:desc",
    limit_hits: number,
  };

  await listClient
    .collections("books")
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(searchResults);
    });
}
</script>
