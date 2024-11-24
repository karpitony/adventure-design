'use client';
import { useState } from 'react';
import { messaging } from '@/config/Firebase';
import { getToken } from "firebase/messaging";

export default function Notification() {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const saveTokenToDatabase = async (token: string) => {
    try {
      const response = await fetch("/api/saveToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to save token");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error saving token to database:", error);
      setMessage("Failed to save token");
    }
  };

  const requestNotificationPermission = () => {
    window.Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(messaging, { 
          vapidKey: 'BHKxrpsR_kM0oNfZlaZh2SDWXkRhNtIac_hhDop8a5ukXVZcBbSmHl-nfZMYr6mFCMj1nVT2FkbkkqgtXbZxqBQ'
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log('Token:', currentToken);
              setToken(currentToken);
              saveTokenToDatabase(currentToken);
            } else {
              console.log('No registration token available.');
              setMessage("No registration token available");
            }
          })
          .catch((err) => {
            console.error('An error occurred while retrieving token.', err);
            setMessage("Error getting token");
            }
          );
      } else {
        console.log('Permission denied.');
        setMessage("Permission denied");
      }
    });
  };

  return (
    <div>
      <h1>Notification</h1>
      <button onClick={requestNotificationPermission}>
        Request Notification Permission
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
