'use client';
import Image from "next/image";
import Notification from "@/components/Notification";

const registerSw = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  }
}

export default function Home() {
  registerSw();
  return (
    <div className="text-white">
      <h1>Home</h1>
      <Image
        src="/3d-bell-icon.avif"
        alt="3D bell icon"
        width={100}
        height={100}
      />
      <Notification />
    </div>
  );
}
