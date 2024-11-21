const admin = require("firebase-admin");

// Firebase 초기화
const serviceAccount = require("../../firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "adventure-design-4t.firebasestorage.app",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
