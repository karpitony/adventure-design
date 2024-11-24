'use client';
import Image from "next/image";
import dynamic from "next/dynamic";

const Notification = dynamic(() => import("@/components/Notification"), {
  ssr: false, // 서버에서 렌더링하지 않음
});

export default function Home() {
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
