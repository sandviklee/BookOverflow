import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch/vue3/es';
import router from './router'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

//Import icons
import primeicons from 'primeicons/primeicons.css'                           //icons

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
const app = createApp(App)
app.use(InstantSearch)
app.use(router)
app.use(pinia)
app.mount('#app')