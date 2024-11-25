import React from 'react';
import { AiOutlineLoading } from "react-icons/ai";

export default function MainCard({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className='flex items-center p-3  rounded-lg bg-white bg-opacity-10 w-full'>
      {children}
    </div>
  );
}

interface MainCardLoadingProps {
  icon?: React.ReactNode;
  context?: React.ReactNode;
}

export function MainCardLoading({icon, context}: MainCardLoadingProps) {
  return (
    <div className='flex items-center'>
      <div className='text-6xl m-2'>
        { icon || 
          <AiOutlineLoading 
            className='text-blue-500 animate-spin'
            style={{ animationDuration: '2s' }}
          />
        }
      </div>
      <div className='ml-4 sm:ml-6'>
        <h1 className='text-lg md:text-2xl font-bold mb-2'>{ context || '로딩중...' }</h1>
      </div>
    </div >
  );
}