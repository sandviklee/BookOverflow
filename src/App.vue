<template>
  <div id="app">
    <navbar @search="performSearch"></navbar>
    <router-view />
</div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,

  }
}
</script>

<style>
#app {
  background-color: rgba(234, 231, 220, 1);

}
</style>