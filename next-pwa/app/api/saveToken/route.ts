import { NextRequest, NextResponse } from "next/server";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!globalThis.firebaseAdminApp) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountString) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT 환경 변수가 설정되지 않았습니다.");
  }

  try {
    // 환경 변수에서 JSON 문자열 파싱
    const serviceAccount = JSON.parse(serviceAccountString);

    globalThis.firebaseAdminApp = initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error) {
    console.error("Firebase 서비스 계정 JSON 처리 중 오류:", error);
    throw new Error("Firebase 서비스 계정 JSON 처리 실패");
  }
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
