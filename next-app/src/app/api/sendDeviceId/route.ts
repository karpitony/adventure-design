// pages/api/sendToken.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
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
    return res.status(200).json({ message: 'Token sent successfully', data });
  } catch (error) {
    console.error('Error sending token:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
