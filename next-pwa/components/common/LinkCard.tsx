import cn from '@yeahx4/cn';

interface LinkCardProps {
  icon: React.ReactNode;
  title: string;
  url: string;
}

export default function LinkCard({ icon, title, url }: LinkCardProps) {
  return (
    <div
      onClick={() => window.open(url, '_blank')}
      className={cn(
        'flex items-center justify-center w-full p-2', 
        'border-2 border-gray-500 rounded-lg cursor-pointer ',
        'bg-white bg-opacity-15 transition duration-200 hover:bg-opacity-25'
      )}
    >
      <div className='text-3xl mr-4'>
        {icon}
      </div>
      <h1 className='text-xl font-bold'>
        {title}
      </h1>
    </div>
  );
}
