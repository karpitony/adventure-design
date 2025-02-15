import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import cn from '@yeahx4/cn';

export const metadata: Metadata = {
  title: "스마트 차수판 웹앱 | 4T조",
  description: "어드벤처디자인 1분반(김경자 교수님) 4T조 스마트 차수판 웹앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className='w-full h-full flex justify-center font-cookierun'>
        <main className='w-full max-w-lg'>
          {children}
        </main>
      </body>
    </html>
  );
}
