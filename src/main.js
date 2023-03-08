import { createApp } from 'vue'
import App from './App.vue'
import InstantSearch from 'vue-instantsearch/vue3/es';
import router from './router'

//Import icons
import primeicons from 'primeicons/primeicons.css'                           //icons

let app = createApp(App)
app.use(InstantSearch)
app.use(router)
app.mount('#app')