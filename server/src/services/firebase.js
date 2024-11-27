const admin = require("firebase-admin");
const path = require('path');

// Firebase 서비스 계정 파일 경로
const serviceAccount = require(path.join(__dirname, '../../firebase-service-account.json'));

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Connect FCM: Initialize FCM SDK');
} else {
  console.log('Connect FCM: Firebase SDK already initialized.');
}

const db = admin.firestore();

module.exports = { admin, db };
