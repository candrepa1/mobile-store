// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3zD5uN-7_LW9SbfnhWWiRWDI5FqYEKOc",
    authDomain: "mobile-store-6cd44.firebaseapp.com",
    projectId: "mobile-store-6cd44",
    storageBucket: "mobile-store-6cd44.appspot.com",
    messagingSenderId: "200264232445",
    appId: "1:200264232445:web:8948d1a97744449de0bd94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const getFirebaseAuth = () => auth;

export { getFirebaseAuth };