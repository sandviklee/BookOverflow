import * as firebase from 'firebase/app';
//import 'firebase/auth';
//import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBcPMAVJdmJ3yWADip0ymhN1VatVjUOuZE",
    authDomain: "bookoverflow-561d1.firebaseapp.com",
    projectId: "bookoverflow-561d1",
    storageBucket: "bookoverflow-561d1.appspot.com",
    messagingSenderId: "948092198327",
    appId: "1:948092198327:web:a5cf5eadb4623626671c32",
    measurementId: "G-YW0HE6YYVP"
}

const firebaseApp = firebase.initializeApp(config)
//db kan brukes til å aksessere databasen vår i firestore
export const db = getFirestore(firebaseApp)
