// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9Ofc7B1KAraIbfhxFprDg4VI2EIsPnW0",
  authDomain: "adventure-design-4t.firebaseapp.com",
  projectId: "adventure-design-4t",
  storageBucket: "adventure-design-4t.firebasestorage.app",
  messagingSenderId: "11911911621",
  appId: "1:11911911621:web:78d49597eee9fa517c38ac",
  measurementId: "G-V9N1GEXP5Z"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);