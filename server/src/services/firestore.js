const { db } = require("./firebase");

// 디바이스 토큰 저장
async function saveDeviceToken(token) {
  try {
    const tokenRef = db.collection("deviceTokens").doc(token);
    await tokenRef.set({
      createdAt: new Date(),
    });
    console.log(`Token ${token} saved successfully`);
  } catch (error) {
    console.error("Error saving token to Firestore:", error);
    throw error;
  }
}

// 파일 메타데이터 저장
async function saveFileMetadata(metadata) {
  try {
    const fileRef = db.collection("files").doc();
    await fileRef.set({
      ...metadata,
      createdAt: new Date(),
    });
    console.log(`File metadata saved successfully:`, metadata);
  } catch (error) {
    console.error("Error saving file metadata to Firestore:", error);
    throw error;
  }
}

module.exports = { saveDeviceToken, saveFileMetadata };
