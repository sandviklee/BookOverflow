<script setup>
import { ref } from "vue";

const props = defineProps({
    listName: String
})
</script>

<template>
  <div>
    <slot><h3>{{ listName || '' }}</h3></slot>
  </div>
</template>
