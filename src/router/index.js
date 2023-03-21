import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SignupPage from '../components/SignupPage.vue'
import SignupRegisterPage from '../components/SignupRegisterPage.vue'
import ViewAuthor from '../components/ViewAuthorPage.vue'
import ViewBook from '../components/ViewBookPage.vue'
import UserList from '../components/UserList.vue'
import TheLibrary from '../components/TheLibrary.vue'


//createApp(App).use(router).mount('#app')

const routes = [
    { path: '/', component: HomePage },
    { path: '/signup', component: SignupPage, meta: {hideNavbar: true}},
    { path: '/signup/register', component: SignupRegisterPage, meta: {hideNavbar: true}},
    { path: '/author/', component: ViewAuthor },
    { path: '/book/:id', component: ViewBook },
    { path: '/userlist/:id', component: UserList },
    { path: '/thelibrary', component: TheLibrary },
  ]
  
const router = createRouter({
  history: createWebHistory(),
  routes
})
  
export default router