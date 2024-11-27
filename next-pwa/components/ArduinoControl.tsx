import { useState } from "react";
import ControlButton from "./common/ControlButton";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

const sendArduinoStatus = () => {
  console.log("sendArduinoStatus");
}

const sendArduinoUp = () => {
  console.log("sendArduinoUp");
} 

const sendArduinoDown = () => {
  console.log("sendArduinoDown");
}


export default function ArduinoControl() {
  const [refershLodaing, setRefreshLoading] = useState(false);

  const refershArduinoStatus = () => {
    setRefreshLoading(true);
    console.log("refreshArduinoStatus");
  }

  return (
    <div className="flex flex-row w-full space-x-3 sm:space-x-4">
      {/* Arduino Control Status Card */}
      <div className="p-3 rounded-lg bg-white bg-opacity-10 w-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">차수판 상태</h1>
          <button 
            onClick={refershArduinoStatus}
            className={refershLodaing ? "animate-spin" : ""}
            style={{ animationDuration: '2s' }}
          >
            <FiRefreshCcw className="text-3xl text-slate-500" />
          </button>
        </div>
      </div>

      {/* Arduino Control Button */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <ControlButton onClick={sendArduinoUp}>
          <FaChevronCircleUp className="text-5xl sm:text-6xl text-slate-500" />
        </ControlButton>
        <ControlButton onClick={sendArduinoDown}>
          <FaChevronCircleDown className="text-5xl sm:text-6xl text-slate-500" />
        </ControlButton>
      </div>
    </div>
  );
}