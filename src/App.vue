<template>
  <div>
    <Suspense>
      <template #default>
        <div id="app">
          <navbar v-if="!$route.meta.hideNavbar" @search="performSearch"></navbar>
          <RouterView />
        </div>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import { defineAsyncComponent, ref, onMounted } from 'vue';

const Book = defineAsyncComponent(() => import('./components/Book.vue'));
</script>

<style>
#app {
  background-color: rgba(234, 231, 220, 1);

}
</style>