"use client";

import { useEffect, useState } from "react";
import {
  getMessaging,
  onMessage,
  getToken,
  isSupported,
} from "firebase/messaging";
import { firebaseApp } from "@/firebase";

async function sendToken(token: string, setStatus: (status: string) => void) {
  try {
    const response = await fetch("/api/sendToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data);
      setStatus("success");
    } else {
      console.error("Error:", data.error);
      setStatus("error");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    setStatus("error");
  }
}

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

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null); // 성공 상태 관리

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
      sendToken(token, setStatus); // 상태 업데이트를 위한 setStatus 전달
    }
  };

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
                icon: "/icons/icon-96.png",
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
        <div className="text-4xl">
          {/*🔔{window && "Notification" in window && Notification?.permission}🔔*/}
        </div>
        <div className="break-all">{token}</div>
        <button className="border rounded py-2" onClick={requestPermission}>
          푸시 알림 켜기
        </button>
        {status === "success" && (
          <div className="text-green-500">✅ 토큰 전송에 성공했습니다!</div>
        )}
        {status === "error" && (
          <div className="text-red-500">❌ 토큰 전송에 실패했습니다!</div>
        )}
      </div>
    </main>
  );
}
