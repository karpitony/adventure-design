const express = require("express");
const dotenv = require("dotenv");
const ngrok = require("@ngrok/ngrok");
const notificationRoutes = require("./routes/notifications");
const storageRoutes = require("./routes/storage");
const firestoreRoutes = require("./routes/firestore");

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// 라우트 등록
app.use("/api/notifications", notificationRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/firestore", firestoreRoutes);

// 서버 시작 및 ngrok 연결
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const listener = await ngrok.connect({ addr: PORT, authtoken: process.env.NGROK_AUTHTOKEN });
    const url = listener.url();
    console.log(`Ingress established at: ${url}`);
  } catch (error) {
    console.error("Error connecting to ngrok:", error);
  }
});
