<template>
  <div id="app">
    <navbar v-if="!$route.meta.hideNavbar"></navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  // data() {
  //   return {
  //     searchClient,
  //   };
  // },
}
</script>