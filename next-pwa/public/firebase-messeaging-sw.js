importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Firebase 초기화
firebase.initializeApp({
  apiKey: "AIzaSyA9Ofc7B1KAraIbfhxFprDg4VI2EIsPnW0",
  authDomain: "adventure-design-4t.firebaseapp.com",
  projectId: "adventure-design-4t",
  storageBucket: "adventure-design-4t.firebasestorage.app",
  messagingSenderId: "11911911621",
  appId: "1:11911911621:web:78d49597eee9fa517c38ac",
  measurementId: "G-V9N1GEXP5Z"
});

// Firebase Messaging 인스턴스 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  
  const notificationTitle = payload.notification?.title || 'Default Title';
  const notificationOptions = {
    body: payload.notification?.body || 'Default body text.',
    icon: payload.notification?.icon || '/default-icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});