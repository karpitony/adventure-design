'use client';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import LinkCard from "@/components/common/LinkCard";
import MainCard, { MainCardLoading } from "@/components/common/MainCard";
import Weather from "@/components/Weather";
import { TbBrandYoutubeKids, TbBrandGithub } from "react-icons/tb";

const Notification = dynamic(() => import("@/components/Notification"), {
  ssr: false, // 서버에서 렌더링하지 않음
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

  return (
    <div className="w-full text-white">
      <h3 className="mt-4 text-base min-[372px]:text-lg sm:text-xl leading-none font-bold tracking-tight text-purple-200">
        <span className="text-[gold] opacity-75">어드벤쳐 디자인 N분반</span> @4T조
      </h3>
      <h1 className="text-4xl min-[372px]:text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-purple-400">
        스마트 차수판 웹앱
      </h1> 
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <LinkCard
            icon={<TbBrandYoutubeKids className="text-red-500" />}
            title="시연 영상"
            url="TBD"
          />
          <LinkCard
            icon={<TbBrandGithub className="text-gray-500" />}
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
      </div>
    </div>
  );
}
