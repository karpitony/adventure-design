const express = require("express");
const { uploadFile, downloadFile, deleteFile } = require("../services/storage");

const router = express.Router();

// 파일 업로드
router.post("/upload", async (req, res) => {
  const { localFilePath, destination } = req.body;

  if (!localFilePath || !destination) {
    return res.status(400).json({ error: "Missing parameters: localFilePath or destination" });
  }

  try {
    await uploadFile(localFilePath, destination);
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 파일 다운로드
router.get("/download", async (req, res) => {
  const { source, destination } = req.query;

  if (!source || !destination) {
    return res.status(400).json({ error: "Missing parameters: source or destination" });
  }

  try {
    await downloadFile(source, destination);
    res.status(200).json({ message: "File downloaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 파일 삭제
router.delete("/delete", async (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "Missing parameter: filePath" });
  }

  try {
    await deleteFile(filePath);
    res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
