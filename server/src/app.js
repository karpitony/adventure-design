const express = require('express');
const { 
    connectArduino,
    startReceivingData
} = require('./services/serial');
const notificationsRouter = require('./routes/notifications');
const arduinoRouter = require('./routes/arduino');

const app = express();
app.use(express.json());
app.use('/notifications', notificationsRouter);
app.use('/arduino', arduinoRouter);

// 아두이노 연결 및 데이터 송수신 준비
connectArduino()
  .then(() => {
    startReceivingData();
  })
  .catch((err) => {
    console.error('Failed to initialize Arduino connection:', err.message);
  });

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});