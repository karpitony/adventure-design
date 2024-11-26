'use client';
import { useState, useEffect } from 'react';
import { FaBell, FaBellSlash } from "react-icons/fa6";
import cn from '@yeahx4/cn';
import { registerServiceWorker } from '@/libs/ServiceWorker';
import getFcmToken from '@/libs/GetFcmToken';

export default function Notification() {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);

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

  const handleRequestPermission = async () => {
    setLoading(true);
    const { token: currentToken, message, permission } = await getFcmToken();

    setPermission(permission);
    setMessage(message);

    if (currentToken) {
      setToken(currentToken);
      await saveTokenToDatabase(currentToken);
    }

    setLoading(false);
  };

  return (
    <>
      <div className='text-6xl m-2'>
      {permission === 'granted' ? (
        <FaBell className='text-blue-500' />
      ) : (
        <FaBellSlash className='text-red-500' />
      )}
      </div>
      <div className='ml-2 sm:ml-4'>
        <h1 className='text-2xl font-bold mb-2'>알림 설정</h1>
        {permission === 'granted' ? (
          <p className='text-green-500 font-semibold'>알림이 활성화되어 있습니다.</p>
        ) : (
          <button 
            onClick={handleRequestPermission}
            disabled={loading}
            className={cn(
              'flex items-center rounded bg-blue-600 hover:bg-blue-700', 
              'text-white transition duration-200 px-4 py-2 font-semibold'
            )}
          >
              {loading ? '로딩 중...' : '클릭해서 알림 허용'}
          </button>
        )}
        {message && <p className='mt-2 text-sm text-gray-200'>{message}</p>}
      </div>
    </>
  );
}