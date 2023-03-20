<template>
  <div id="app">
    <link rel="icon" type="image/x-icon" href="./public/favicon.ico">
    <navbar v-if="!$route.meta.hideNavbar" @search="performSearch"></navbar>
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
</script>
