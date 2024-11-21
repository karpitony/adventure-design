const { bucket } = require("./firebase");

// 파일 업로드
async function uploadFile(localFilePath, destination) {
  try {
    await bucket.upload(localFilePath, { destination });
    console.log(`${localFilePath} uploaded to ${destination}`);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// 파일 다운로드
async function downloadFile(source, destination) {
  try {
    await bucket.file(source).download({ destination });
    console.log(`${source} downloaded to ${destination}`);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

// 파일 삭제
async function deleteFile(filePath) {
  try {
    await bucket.file(filePath).delete();
    console.log(`${filePath} deleted successfully`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

module.exports = { uploadFile, downloadFile, deleteFile };
