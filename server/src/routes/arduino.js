const express = require('express');
const router = express.Router();
const { sendDataToArduino, getArduinoStatus, isArduinoConnected } = require('../services/serial');

// 아두이노 연결 상태 체크 함수
const checkArduinoConnection = (res) => {
  if (!isArduinoConnected()) {
    res.status(503).json({
      status: "error",
      message: "Arduino is not connected."
    });
    return false;
  }
  return true;
};

// 아두이노 상태 확인 엔드포인트
router.get('/status', async (req, res) => {
  if (!checkArduinoConnection(res)) return;

  try {
    const status = await getArduinoStatus();
    if (status === 'UP' || status === 'DOWN') {
      res.status(200).json({
        status: "success",
        message: status // UP or DOWN
      });
    } else {
      res.status(500).json({
        status: "error",
        message: 'Unexpected response from Arduino.'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: 'Error retrieving Arduino status: ' + err.message
    });
  }
});

// 아두이노 UP 엔드포인트
router.post('/up', async (req, res) => {
  if (!checkArduinoConnection(res)) return;

  try {
    const currentStatus = await getArduinoStatus();

    // 현재 상태가 UP인 경우 "already" 상태로 응답
    if (currentStatus === 'UP') {
      sendDataToArduino('UP'); // 명령은 그대로 전송
      return res.status(200).json({
        status: "already",
        message: "UP"
      });
    }

    // 현재 상태가 UP이 아닌 경우에도 명령 전송
    sendDataToArduino('UP');

    // 즉시 성공 응답 반환
    res.status(200).json({
      status: "success",
      message: "UP command sent to Arduino"
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: 'Error processing UP command: ' + err.message
    });
  }
});

// 아두이노 DOWN 엔드포인트
router.post('/down', async (req, res) => {
  if (!checkArduinoConnection(res)) return;

  try {
    const currentStatus = await getArduinoStatus();

    // 현재 상태가 DOWN인 경우 "already" 상태로 응답
    if (currentStatus === 'DOWN') {
      sendDataToArduino('DOWN'); // 명령은 그대로 전송
      return res.status(200).json({
        status: "already",
        message: "DOWN"
      });
    }

    // 현재 상태가 DOWN이 아닌 경우에도 명령 전송
    sendDataToArduino('DOWN');

    // 즉시 성공 응답 반환
    res.status(200).json({
      status: "success",
      message: "DOWN command sent to Arduino"
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: 'Error processing DOWN command: ' + err.message
    });
  }
});


module.exports = router;
