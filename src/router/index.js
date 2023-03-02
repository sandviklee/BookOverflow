import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SignupPage from '../components/SignupPage.vue'
import SearchPage from '../components/SearchPage.vue'
import ViewAuthor from '../components/ViewAuthorPage.vue'
import ViewBook from '../components/ViewBookPage.vue'
import UserList from '../components/UserList.vue'


//createApp(App).use(router).mount('#app')

const routes = [
    { path: '/', component: HomePage },
    { path: '/search', component: SearchPage },
    { path: '/signup', component: SignupPage },
    { path: '/author/', component: ViewAuthor },
    { path: '/book/:id', component: ViewBook },
    { path: '/userlist/:id', component: UserList },
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router