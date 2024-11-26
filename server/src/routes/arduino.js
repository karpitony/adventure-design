const express = require('express');
const router = express.Router();
const { sendDataToArduino, getArduinoStatus } = require('../services/serial');

// 아두이노 상태 확인 엔드포인트
router.get('/status', async (req, res) => {
  try {
    const status = await getArduinoStatus();
    if (status === 'UP' || status === 'DOWN') {
      res.status(200).json({
        status: "success",
        message: `Arduino is currently ${status}.`
      });
    } else {
      res.status(500).json({
        status: "error",
        error: 'Unexpected response from Arduino.'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: 'Error retrieving Arduino status: ' + err.message
    });
  }
});

// 아두이노 UP 엔드포인트
router.post('/up', async (req, res) => {
  try {
    const currentStatus = await getArduinoStatus();

    if (currentStatus === 'UP') {
      return res.status(200).json({
        status: "already",
        message: "UP"
      });
    }

    sendDataToArduino('UP');
    const response = await new Promise((resolve, reject) => {
      parser.once('data', (data) => {
        const trimmedResponse = data.trim();

        if (trimmedResponse === 'UP' || trimmedResponse === 'DOWN') {
          resolve(trimmedResponse);
        } else {
          reject(new Error('Unexpected response from Arduino.'));
        }
      });

      setTimeout(() => reject(new Error('Timeout waiting for Arduino response.')), 2000);
    });

    res.status(200).json({
      status: "success",
      message: response
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: 'Error processing UP command: ' + err.message
    });
  }
});

// 아두이노 DOWN 엔드포인트
router.post('/down', async (req, res) => {
  try {
    const currentStatus = await getArduinoStatus();

    if (currentStatus === 'DOWN') {
      return res.status(200).json({
        status: "already",
        message: "DOWN"
      });
    }

    sendDataToArduino('DOWN');
    const response = await new Promise((resolve, reject) => {
      parser.once('data', (data) => {
        const trimmedResponse = data.trim();

        if (trimmedResponse === 'UP' || trimmedResponse === 'DOWN') {
          resolve(trimmedResponse);
        } else {
          reject(new Error('Unexpected response from Arduino.'));
        }
      });

      setTimeout(() => reject(new Error('Timeout waiting for Arduino response.')), 2000);
    });

    res.status(200).json({
      status: "success",
      message: response
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: 'Error processing DOWN command: ' + err.message
    });
  }
});

module.exports = router;
