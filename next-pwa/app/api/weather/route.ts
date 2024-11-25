import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { lat, lon } = await req.json();

    if (!lat || !lon) {
      return NextResponse.json({ error: '위도와 경도가 필요합니다.' }, { status: 400 });
    }

    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ error: '서버에 API 키가 설정되지 않았습니다.' }, { status: 500 });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || '날씨 데이터를 가져오는 중 오류가 발생했습니다.' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.json({ error: '날씨 데이터를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}