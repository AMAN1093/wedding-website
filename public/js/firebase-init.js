// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4OUv-FrYtb2tKlIu9ZeGTHsI8xkb3K4o",
  authDomain: "teamspc-6f85b.firebaseapp.com",
  projectId: "teamspc-6f85b",
  storageBucket: "teamspc-6f85b.firebasestorage.app",
  messagingSenderId: "442886029783",
  appId: "1:442886029783:web:98b521bcb16801ad584b92",
  measurementId: "G-VHSBGHC0QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);