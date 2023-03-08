import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Import icons
//import primeicons from 'primeicons/primeicons.css'                           //icons

let app = createApp(App)
app.use(router)
app.mount('#app')