import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const response = await fetch('https://sawfly-in-quagga.ngrok-free.app/api/store-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to send token');
    }

    const data = await response.json();
    return NextResponse.json({ message: 'Token sent successfully', data });
  } catch (error: any) {
    console.error('Error sending token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
