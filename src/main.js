import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch/vue3/es';
import router from './router'


//Import icons
import primeicons from 'primeicons/primeicons.css'                           //icons

const pinia = createPinia()
const app = createApp(App)
app.use(InstantSearch)
app.use(router)
app.use(pinia)
app.mount('#app')