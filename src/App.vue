<template>
  <div id="app">
    <navbar v-if="!$route.meta.hideNavbar" @search="performSearch"></navbar>
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>
