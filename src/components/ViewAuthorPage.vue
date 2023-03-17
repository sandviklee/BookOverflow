<template>
  <div>
    <div class="card">Dette er en author side</div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

let author = "";
author = route.params.id;
console.log(author);
</script>
