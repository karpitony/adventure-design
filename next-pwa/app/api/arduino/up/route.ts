import { NextResponse } from "next/server";

const URL = `${process.env.LOCAL_TUNNEL_URL}/arduino/up`;

interface ArduinoCommandResponse {
  status: "success" | "error" | "already";
  message: string;
}

export async function POST() {
  try {
    const response = await fetch(URL, {
      method: "POST",
    });
    const data: ArduinoCommandResponse = await response.json();

    if (!response.ok || data.status === "error") {
      return NextResponse.json(
        {
          status: "error",
          message: data.message || "Arduino UP 명령 처리 중 오류가 발생했습니다.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        status: data.status,
        message: data.message, // "UP" or other valid response
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Arduino UP 명령 처리 중 오류 발생:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Arduino UP 명령 처리 중 예기치 않은 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
