"use client";

import { useState, useEffect } from "react";
import {
  getMessaging,
  onMessage,
  getToken,
  isSupported,
} from "firebase/messaging";
import { firebaseApp } from "@/firebase";

const messaging = async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const permission = Notification.permission;

  const requestPermission = async () => {
    const messagingResolve = await messaging();
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications.");
      return;
    }
    if (messagingResolve) {
      const token = await getToken(messagingResolve);
      setToken(token);
      console.log("token", token);
    }
  }

  useEffect(() => {
    alert(token);
  }, [token]);

  useEffect(() => {
    const onMessageListener = async () => {
      const messagingResolve = await messaging();
      if (messagingResolve) {
        onMessage(messagingResolve, (payload) => {
          if (!("Notification" in window)) {
            return;
          }
          const permission = Notification.permission;
          const title = payload.notification?.title + " foreground";
          const redirectUrl = "/";
          const body = payload.notification?.body;
          if (permission === "granted") {
            console.log("payload", payload);
            if (payload.data) {
              const notification = new Notification(title, {
                body,
                icon: "/icon.png",
              });
              notification.onclick = () => {
                window.open(redirectUrl, "_blank")?.focus();
              };
            }
          }
        });
      }
    };
    onMessageListener();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white">
      <div className="flex flex-col gap-10">
        <div className="text-4xl">🔔{permission}🔔</div>
        <button className="border rounded py-2" onClick={requestPermission}>
          푸시 알림 켜기
        </button>
      </div>
    </main>
  );
}