importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + " (onBackgroundMessage)";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(title, notificationOptions);
});