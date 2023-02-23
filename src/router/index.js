import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SearchPage from '../components/SearchPage.vue'
import ViewAuthor from '../components/ViewAuthor.vue'
import ViewBook from '../components/ViewBook.vue'
import UserList from '../components/UserList.vue'


//createApp(App).use(router).mount('#app')

const routes = [
    { path: '/', component: HomePage },
    { path: '/search', component: SearchPage },
    { path: '/author/:id', component: ViewAuthor },
    { path: '/book/:id', component: ViewBook },
    { path: '/userlist/:id', component: UserList }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router