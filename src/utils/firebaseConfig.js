// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEHnxzoTL4Pyj1K5AR2nLy9hurNYzA1hA",
    authDomain: "job-finder-622e1.firebaseapp.com",
    projectId: "job-finder-622e1",
    storageBucket: "job-finder-622e1.firebasestorage.app",
    messagingSenderId: "671311190767",
    appId: "1:671311190767:web:5a801d85305436e881591a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }


