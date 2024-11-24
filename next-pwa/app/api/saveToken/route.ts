import { NextRequest, NextResponse } from "next/server";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firebase Admin 초기화
if (!globalThis.firebaseAdminApp) {
  const serviceAccount = require("@/config/firebase-service-account.json");
  globalThis.firebaseAdminApp = initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore(globalThis.firebaseAdminApp);

export async function POST(req: NextRequest) {
  try {
    // 요청에서 데이터 추출
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Firestore에 토큰 저장
    const tokenRef = db.collection("deviceTokens").doc(token);
    await tokenRef.set({
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Token saved successfully" });
  } catch (error) {
    console.error("Error saving token to Firestore:", error);
    return NextResponse.json(
      { error: "Failed to save token" },
      { status: 500 }
    );
  }
}
