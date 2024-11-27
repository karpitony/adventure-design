import { NextResponse } from "next/server";

const URL = `${process.env.LOCAL_TUNNEL_URL}/arduino/status`;

interface ArduinoStatusResponse {
  status: "success" | "error" | "already";
  message: string;
}

export async function GET() {
  try {
    const response = await fetch(URL);
    const data: ArduinoStatusResponse = await response.json();

    if (!response.ok || data.status === "error") {
      return NextResponse.json(
        { status: "error", message: data.message || "Arduino 상태를 가져오는 중 오류가 발생했습니다." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        status: data.status,
        message: data.message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Arduino 상태를 가져오는 중 오류 발생:", error);
    return NextResponse.json(
      { status: "error", message: "Arduino 상태를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
