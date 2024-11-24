import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getMessaging } from 'firebase/messaging';
import { } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9Ofc7B1KAraIbfhxFprDg4VI2EIsPnW0",
  authDomain: "adventure-design-4t.firebaseapp.com",
  projectId: "adventure-design-4t",
  storageBucket: "adventure-design-4t.firebasestorage.app",
  messagingSenderId: "11911911621",
  appId: "1:11911911621:web:78d49597eee9fa517c38ac",
  measurementId: "G-V9N1GEXP5Z"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const messaging = getMessaging(app);