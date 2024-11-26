'use client';

import { useState, useEffect } from 'react';
import cn from '@yeahx4/cn';

interface ToastProps {
  title: string;
  body?: string;
  type: "success" | "error" | "warning" | "info";
}

export default function Toast({ title, body, type }: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  function getTypeClass() {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "";
    }
  }

  useEffect(() => {
    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }, 10000); // 10초 후에 자동으로 사라짐

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 right-4 p-4 rounded-lg text-white shadow-lg transition-opacity duration-500',
        getTypeClass(), animate ? 'opacity-100' : 'opacity-0',
        'w-56 z-10'
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-xl">{title}</div>
          {body && <div className="text-base mt-1">{body}</div>}
        </div>
        <button onClick={() => setVisible(false)} className="ml-4 focus:outline-none text-xl">
          &times;
        </button>
      </div>
    </div>
  );
}
