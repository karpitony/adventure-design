import cn from '@yeahx4/cn';

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function ControlButton({ onClick, children }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center font-bold w-full h-32 p-1 md:p-2 transition duration-200",
        "rounded-lg cursor-pointer border-2 border-gray-500 bg-white bg-opacity-10 hover:bg-opacity-20"
      )}
    >
      {children}
    </button>
  );
}