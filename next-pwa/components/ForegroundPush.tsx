'use client';

import { useState, useEffect } from 'react';
import { getMessaging, onMessage } from "firebase/messaging";
import Toast from './common/Toast';
import getFcmToken from '@/libs/GetFcmToken';

interface Notification {
  id: number;
  title: string;
  body?: string;
  type: "success" | "error" | "warning" | "info";
}

export default function ForegroundPush() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const initializeMessaging = async () => {
      const fcmToken = await getFcmToken();
      if (fcmToken) {
        const messaging = getMessaging();

        onMessage(messaging, (payload) => {
          if (payload.notification) {
            const { title, body } = payload.notification;

            // 고유 ID 생성
            const id = Date.now();

            setNotifications((prev) => {
              // 새로운 알림 생성
              const newNotification: Notification = {
                id,
                title: title || "알림",
                body: body || "",
                type: "info",
              };

              // 최대 5개의 알림 유지
              const updatedNotifications = [...prev, newNotification];
              return updatedNotifications.slice(-5);
            });

            // 브라우저 알림 표시 (선택적)
            if (navigator.serviceWorker) {
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(title || "알림", { body });
              });
            }
          }
        });
      }
    };

    initializeMessaging();
  }, []);

  // 토스트 닫기 핸들러
  const handleClose = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <>
      {notifications.map((notif) => (
        <Toast
          key={notif.id}
          title={notif.title}
          body={notif.body}
          type={notif.type}
          onClose={() => handleClose(notif.id)}
        />
      ))}
    </>
  );
}
