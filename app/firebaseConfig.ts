import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4bVVATRKHCRuozJAq2tTCp_N7FS8JnO4",
  authDomain: "comunet-jose.firebaseapp.com",
  projectId: "comunet-jose",
  storageBucket: "comunet-jose.appspot.com",
  messagingSenderId: "11303678718",
  appId: "1:11303678718:web:5812d41fc07c2d66bb2baf",
  measurementId: "G-WMB6TNN2VS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);