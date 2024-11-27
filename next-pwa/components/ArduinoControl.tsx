import { useState } from "react";
import ControlButton from "./common/ControlButton";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

const fetchArduinoStatus = async () => {
  try {
    const response = await fetch("/api/arduino/status");
    if (!response.ok) {
      throw new Error("Failed to fetch Arduino status");
    }
    const data = await response.json();
    return data.message; // "UP" or "DOWN"
  } catch (error) {
    console.error("Error fetching Arduino status:", error);
    return null;
  }
};

const sendArduinoUp = async () => {
  try {
    const response = await fetch("/api/arduino/up", { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to send UP command");
    }
    const data = await response.json();
    return data.message; // "UP" or error message
  } catch (error) {
    console.error("Error sending UP command:", error);
    return null;
  }
};

const sendArduinoDown = async () => {
  try {
    const response = await fetch("/api/arduino/down", { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to send DOWN command");
    }
    const data = await response.json();
    return data.message; // "DOWN" or error message
  } catch (error) {
    console.error("Error sending DOWN command:", error);
    return null;
  }
};

export default function ArduinoControl() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshArduinoStatus = async () => {
    setLoading(true);
    const newStatus = await fetchArduinoStatus();
    setStatus(newStatus);
    setLoading(false);
  };

  const handleArduinoUp = async () => {
    const result = await sendArduinoUp();
    if (result) setStatus(result);
  };

  const handleArduinoDown = async () => {
    const result = await sendArduinoDown();
    if (result) setStatus(result);
  };

  return (
    <div className="flex flex-row w-full space-x-3 sm:space-x-4">
      {/* Arduino Control Status Card */}
      <div className="p-3 rounded-lg bg-white bg-opacity-10 w-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">차수판 상태</h1>
          <button
            onClick={refreshArduinoStatus}
            className={loading ? "animate-spin" : ""}
            style={{ animationDuration: "2s" }}
            disabled={loading}
          >
            <FiRefreshCcw className="text-3xl text-slate-500" />
          </button>
        </div>
        <p className="mt-2 text-lg">
          현재 상태: <span className="font-semibold">{status || "불명확"}</span>
        </p>
      </div>

      {/* Arduino Control Button */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <ControlButton onClick={handleArduinoUp}>
          <FaChevronCircleUp className="text-5xl sm:text-6xl text-slate-500" />
        </ControlButton>
        <ControlButton onClick={handleArduinoDown}>
          <FaChevronCircleDown className="text-5xl sm:text-6xl text-slate-500" />
        </ControlButton>
      </div>
    </div>
  );
}
