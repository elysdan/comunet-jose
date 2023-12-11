// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4bVVATRKHCRuozJAq2tTCp_N7FS8JnO4",
  authDomain: "comunet-jose.firebaseapp.com",
  projectId: "comunet-jose",
  storageBucket: "comunet-jose.appspot.com",
  messagingSenderId: "11303678718",
  appId: "1:11303678718:web:5812d41fc07c2d66bb2baf",
  measurementId: "G-WMB6TNN2VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;