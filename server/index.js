const express = require("express");
const admin = require("firebase-admin");
const ngrok = require("@ngrok/ngrok");

// Firebase Admin 초기화
const serviceAccount = require("./firebase-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// 미리 정의된 메시지
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
  const db = admin.firestore();
  const tokensSnapshot = await db.collection("deviceTokens").get();

  // 토큰 목록 추출
  return tokensSnapshot.docs.map((doc) => doc.data().token);
}

// 공통 푸시 알림 함수
async function sendNotification(type) {
  if (!messages[type]) {
    throw new Error("Invalid notification type");
  }

  try {
    const tokens = await getTokens();

    if (tokens.length === 0) {
      throw new Error("No device tokens found");
    }

    const message = {
      notification: messages[type],
      tokens, // 여러 토큰에 전송
    };

    const response = await admin.messaging().sendMulticast(message);
    console.log("Notifications sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}

// `api/up` 라우트
app.get("/api/up", async (req, res) => {
  try {
    await sendNotification("up");
    res.status(200).json({ message: "Notification for 'up' sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// `api/down` 라우트
app.get("/api/down", async (req, res) => {
  try {
    await sendNotification("down");
    res.status(200).json({ message: "Notification for 'down' sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 서버 시작 및 ngrok 연결
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const url = await ngrok.connect({ addr: PORT, authtoken_from_env: true });
    console.log(`Ingress established at: ${url}`);
  } catch (error) {
    console.error("Error connecting to ngrok:", error);
  }
});
