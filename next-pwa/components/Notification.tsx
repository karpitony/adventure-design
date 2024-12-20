'use client';
import { useState, useEffect } from 'react';
import { FaBell, FaBellSlash } from "react-icons/fa6";
import cn from '@yeahx4/cn';
import { registerServiceWorker } from '@/libs/ServiceWorker';
import getFcmToken from '@/libs/GetFcmToken';

export default function Notification() {
  const [token, setToken] = useState<string | null | undefined>(null);
  const [message, setMessage] = useState("");
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);
  const [showToken, setShowToken] = useState(false); // 토큰을 보일지 말지 상태

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(window.Notification.permission);
    } else {
      console.warn('This browser does not support notifications.');
      setMessage("이 브라우저는 알림을 지원하지 않습니다.");
    }
    registerServiceWorker();
    getFcmToken().then(({ token, message, permission }) => {
      setToken(token);
      // setMessage(message);
      setPermission(permission);
    });
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

  const toggleTokenVisibility = () => {
    setShowToken((prev) => !prev); // 토큰 보이기/숨기기
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

        {/* 토큰 보기 버튼 추가 */}
        <div className='mt-1'>
          <button
            onClick={toggleTokenVisibility}
            className='text-sm text-gray-500 hover:text-gray-700'
          >
            {showToken ? '토큰 숨기기' : '토큰 보기'}
          </button>
          {/* 토큰 보이기 */}
          {showToken && (
            <p className='mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded z-10'>
              {token || 'ERROR: 토큰이 없습니다.'}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
