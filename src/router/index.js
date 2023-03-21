import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SignupPage from '../components/SignupPage.vue'
import SignupRegisterPage from '../components/SignupRegisterPage.vue'
import ViewAuthor from '../components/ViewAuthorPage.vue'
import ViewBook from '../components/ViewBookPage.vue'
import UserList from '../components/UserList.vue'
import TheLibrary from '../components/TheLibrary.vue'
import WriteReviewPage from '../components/WriteReviewPage.vue'

//createApp(App).use(router).mount('#app')

const routes = [
    { path: '/', component: HomePage },
    { path: '/signup', component: SignupPage, meta: {hideNavbar: true}},
    { path: '/signup/register', component: SignupRegisterPage, meta: {hideNavbar: true}},
    { path: '/author/:id', component: ViewAuthor },
    { path: '/book/:id', component: ViewBook },
    { path: '/userlist/:id', component: UserList },
    { path: '/thelibrary', component: TheLibrary },
    { path: '/review/:id', component: WriteReviewPage, meta: {hideNavbar: true} }
  ]
  
const router = createRouter({
  history: createWebHistory(),
  routes
})
  
export default router