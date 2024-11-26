'use client';

import { useState, useEffect } from 'react';
import { getMessaging, onMessage } from "firebase/messaging";
import Toast from './common/Toast';
import getFcmToken from '@/libs/GetFcmToken';

export default function ForegroundPush() {
  const [notifications, setNotifications] = useState<Array<{ title: string; body?: string; type: "success" | "error" | "warning" | "info" }>>([]);

  useEffect(() => {
    const initializeMessaging = async () => {
      const fcmToken = await getFcmToken();
      if (fcmToken) {
        const messaging = getMessaging();

        onMessage(messaging, (payload) => {
          if (payload.notification) {
            const { title, body } = payload.notification;

            setNotifications((prev) => [
              ...prev,
              { title: title || "알림", body: body || "", type: "info" },
            ]);

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

  return (
    <>
      {notifications.map((notif, index) => (
        <Toast
          key={index}
          title={notif.title}
          body={notif.body}
          type={notif.type}
        />
      ))}
    </>
  );
};
