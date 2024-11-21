const express = require("express");
const { saveDeviceToken, saveFileMetadata } = require("../services/firestore");

const router = express.Router();

// 디바이스 토큰 저장 API
router.post("/save-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    await saveDeviceToken(token);
    res.status(200).json({ message: "Token saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 파일 메타데이터 저장 API
router.post("/save-file-metadata", async (req, res) => {
  const { fileName, url, uploadedBy } = req.body;

  if (!fileName || !url || !uploadedBy) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    await saveFileMetadata({ fileName, url, uploadedBy });
    res.status(200).json({ message: "File metadata saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
