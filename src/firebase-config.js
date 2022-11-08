// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1s8_6GH-3ckEv3jmU4MehORhYooKgS48",
  authDomain: "blog-site-74435.firebaseapp.com",
  projectId: "blog-site-74435",
  storageBucket: "blog-site-74435.appspot.com",
  messagingSenderId: "512390748534",
  appId: "1:512390748534:web:ec53e878fceb71a15ac257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app); 
export const auth= getAuth(app);
export const provider= new GoogleAuthProvider();    