import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


// Import your components here
import Navbar from './components/Navbar.vue'

// Register your components here
Vue.component('navbar', Navbar)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

