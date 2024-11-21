const { admin, db } = require("./firebase");

// 미리 정의된 알림 메시지
const messages = {
  up: {
    title: "차수판 알림",
    body: "차수판이 올라갔습니다!",
  },
  down: {
    title: "차수판 알림",
    body: "차수판이 내려갔습니다!",
  },
};

// Firestore에서 디바이스 토큰 가져오기
async function getTokens() {
  const tokensSnapshot = await db.collection("deviceTokens").get();
  return tokensSnapshot.docs.map((doc) => doc.data().token);
}

// 푸시 알림 전송 함수
async function sendNotification(type) {
  if (!messages[type]) {
    throw new Error("Invalid notification type");
  }

  const tokens = await getTokens();

  if (tokens.length === 0) {
    throw new Error("No device tokens found");
  }

  const message = {
    notification: messages[type],
    tokens,
  };

  const response = await admin.messaging().sendMulticast(message);
  console.log("Notifications sent successfully:", response);
}

module.exports = { sendNotification };
