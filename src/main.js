import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import './assets/main.css'

const firebaseConfig = {
  apiKey: "AIzaSyBcPMAVJdmJ3yWADip0ymhN1VatVjUOuZE",
  authDomain: "bookoverflow-561d1.firebaseapp.com",
  projectId: "bookoverflow-561d1",
  storageBucket: "bookoverflow-561d1.appspot.com",
  messagingSenderId: "948092198327",
  appId: "1:948092198327:web:a5cf5eadb4623626671c32",
  measurementId: "G-YW0HE6YYVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).mount('#app')
