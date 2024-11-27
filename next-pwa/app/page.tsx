'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LinkCard from "@/components/common/LinkCard";
import MainCard, { MainCardLoading } from "@/components/common/MainCard";
import Weather from "@/components/Weather";
import ArduinoControl from "@/components/ArduinoControl";
import { TbBrandYoutubeKids, TbBrandGithub } from "react-icons/tb";

const Notification = dynamic(() => import("@/components/Notification"), {
  ssr: false, // 서버에서 렌더링하지 않음
});

const ForegroundPush = dynamic(() => import("@/components/ForegroundPush"), {
  ssr: false,
});


export default function Home() {
  const [NotificationComponent, setNotificationComponent] = useState(() => MainCardLoading);

  useEffect(() => {
    async function loadNotification() {
      const { default: Notification } = await import('@/components/Notification');
      setNotificationComponent(() => Notification);
    }
    loadNotification();
  }, []);

  const Notification = NotificationComponent;


  // layout.tsx 상단에서 cookierun 폰트 정의중, 맘에 안들면 거기서 바꾸기
  return (
    <div className="w-full text-white">
      <ForegroundPush />
      <h3 className="mt-12 text-base md:text-lg leading-none tracking-tight text-purple-200 font-bold font-cookierun">
        <span className="text-[gold] opacity-75">어드벤쳐 디자인 1분반</span> @ 4T조
      </h3>
      <h1 className="text-4xl md:text-5xl tracking-tight mb-6 md:mb-12 text-purple-400 font-bold font-cookierun">
        스마트 차수판 웹앱
      </h1> 
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4">
          <LinkCard
            icon={<TbBrandYoutubeKids className="text-red-500" />}
            title="시연 영상"
            url="TBD"
          />
          <LinkCard
            icon={<TbBrandGithub className="text-gray-400" />}
            title="소스 코드"
            url="https://github.com/karpitony/adventure-design"
          />
        </div>
        <MainCard>
          <Notification />
        </MainCard>
        <MainCard>
          <Weather />
        </MainCard>
        <ArduinoControl />
      </div>
    </div>
  );
}
