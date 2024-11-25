import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import cn from '@yeahx4/cn';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          'w-full h-full flex justify-center'
        )}
      >
        <main className='w-full max-w-3xl'>
          {children}
        </main>
      </body>
    </html>
  );
}
