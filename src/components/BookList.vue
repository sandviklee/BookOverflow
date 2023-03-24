<script setup>
import { ref } from "vue";
import Book from "./Book.vue";

const props = defineProps({
    bookArray: Array,
    listName: String
})
</script>

<template>
  <div>
    <slot><h3>{{ listName || '' }}</h3></slot>
    <Book class="books" v-for="book in bookArray" />
  </div>
</template>
