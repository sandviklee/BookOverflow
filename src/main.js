import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

//Component imports
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

//Import themes
import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons


let app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')

//Add components to app
app.component('Button', Button);
app.component('Dropdown', Dropdown);



