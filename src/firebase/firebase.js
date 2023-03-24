import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "bookoverflow-561d1.firebaseapp.com",
    projectId: "bookoverflow-561d1",
    storageBucket: "bookoverflow-561d1.appspot.com",
    messagingSenderId: "948092198327",
    appId: "1:948092198327:web:a5cf5eadb4623626671c32",
    measurementId: "G-YW0HE6YYVP"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}
