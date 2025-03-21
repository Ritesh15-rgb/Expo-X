// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtgVH4N2bWrm_wDDu-Sf15U_kQpl9iSfM",
  authDomain: "expoo-2677d.firebaseapp.com",
  projectId: "expoo-2677d",
  storageBucket: "expoo-2677d.firebasestorage.app",
  messagingSenderId: "940615940568",
  appId: "1:940615940568:web:4fe9ba55fcf64950215aad",
  measurementId: "G-C4PQPMC8WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);