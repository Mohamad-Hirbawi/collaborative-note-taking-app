// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8cJfVs6ipFQVqpAdTR_ZZ2NV38Lyn4mE",
    authDomain: "project-628c1.firebaseapp.com",
    projectId: "project-628c1",
    storageBucket: "project-628c1.appspot.com",
    messagingSenderId: "368978097487",
    appId: "1:368978097487:web:2e2e5ae764a8dfa461c13a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
export default app;
