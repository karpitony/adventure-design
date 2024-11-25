// src/routes/notifications.js

const express = require('express');
const router = express.Router();
const { admin, db } = require('../services/firebase');

// Firestore에서 디바이스 토큰을 가져오는 함수
async function getDeviceTokens() {
  const tokens = [];
  try {
    const snapshot = await db.collection('deviceTokens').get();
    console.log('Number of device documents:', snapshot.size);

    snapshot.forEach((doc) => {
      tokens.push(doc.id);
      console.log('Token (from doc.id):', doc.id);
    });
  } catch (error) {
    console.error('Error fetching device tokens:', error);
  }
  return tokens;
}

// 알림을 보내는 함수
async function sendNotification(message) {
  const tokens = await getDeviceTokens();
  if (tokens.length === 0) {
    console.log('No device tokens available.');
    return;
  }

  try {
    for (const token of tokens) {
      await admin.messaging().send({
        token: token,
        notification: {
          title: '알림',
          body: message,
        },
      });
      console.log(`Successfully sent notification to ${token}`);
    }
    console.log('All notifications sent successfully.');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// /notifications/up 엔드포인트
router.post('/up', async (req, res) => {
  await sendNotification('차수판이 올라갔습니다.');
  res.status(200).send('Notification sent for up.');
});

// /notifications/down 엔드포인트
router.post('/down', async (req, res) => {
  await sendNotification('차수판이 내려갔습니다.');
  res.status(200).send('Notification sent for down.');
});

module.exports = router;
