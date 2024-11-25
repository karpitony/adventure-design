'use client';
import { useState, useEffect } from 'react';
import { FaBell, FaBellSlash } from "react-icons/fa6";
import cn from '@yeahx4/cn';
import { messaging } from '@/config/Firebase';
import { getToken } from "firebase/messaging";
import { registerServiceWorker } from '@/libs/ServiceWorker';

export default function Notification() {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(window.Notification.permission);
    } else {
      console.warn('This browser does not support notifications.');
      setMessage("이 브라우저는 알림을 지원하지 않습니다.");
    }
    registerServiceWorker();
  }, []);

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
      setMessage("토큰 저장 실패");
    }
  };

  const requestNotificationPermission = () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      window.Notification.requestPermission().then((permission) => {
        setPermission(permission);
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
                setMessage("알림이 활성화되었습니다.");
              } else {
                console.log('No registration token available.');
                setMessage("등록 토큰이 없습니다.");
              }
            })
            .catch((err) => {
              console.error('An error occurred while retrieving token.', err);
              setMessage("토큰 가져오기 오류");
            });
        } else {
          console.log('Permission denied.');
          setMessage("알림 권한이 거부되었습니다.");
        }
      });
    } else {
      console.warn('This browser does not support notifications.');
      setMessage("이 브라우저는 알림을 지원하지 않습니다.");
    }
  };

  return (
    <div
      className={cn(
        'flex items-center p-3 border-2 border-gray-500 rounded-lg', 
        'bg-white bg-opacity-15 w-full'
      )}
    >
      <div className='text-6xl m-2'>
      {permission === 'granted' ? (
        <FaBell className='text-blue-500' />
      ) : (
        <FaBellSlash className='text-red-500' />
      )}
      </div>
      <div className='ml-4'>
        <h1 className='text-2xl font-bold mb-2'>알림 설정</h1>
        {permission === 'granted' ? (
          <p className='text-green-500 font-semibold'>알림이 활성화되어 있습니다.</p>
        ) : (
          <button 
            onClick={requestNotificationPermission}
            className={cn(
              'flex items-center rounded bg-blue-500 hover:bg-blue-600', 
              'text-white transition px-4 py-2'
            )}
          >
            클릭해서 알림 허용
          </button>
        )}
        {message && <p className='mt-2 text-sm text-gray-200'>{message}</p>}
      </div>
    </div>
  );
}