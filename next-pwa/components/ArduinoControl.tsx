import { useState } from "react";
import ControlButton from "./common/ControlButton";
import Toast from "./common/Toast";
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

const ArduinoControl = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ id: number; title: string; body?: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (title: string, body: string, type: "success" | "error" | "info") => {
    setToast({ id: Date.now(), title, body, type }); // 고유 ID를 추가
    setTimeout(() => setToast(null), 5000); // 5초 후 토스트 자동 사라짐
  };

  const refreshArduinoStatus = async () => {
    setLoading(true);
    try {
      const newStatus = await fetchArduinoStatus();
      setStatus(newStatus);
      if (!newStatus) {
        throw new Error("Failed to fetch Arduino status");
      }
      showToast("상태 갱신 성공", `현재 상태: ${newStatus}`, "success");
    } catch (error: any) {
      showToast("에러 발생", "Arduino 상태를 가져오지 못했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleArduinoUp = async () => {
    setLoading(true);
    try {
      const result = await sendArduinoUp();
      setStatus(result);
      if (!result) {
        throw new Error("Failed to send UP command");
      }
      showToast("명령 성공", "차수판이 올라갔습니다.", "success");
    } catch (error: any) {
      showToast("에러 발생", "차수판을 올리는 명령에 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleArduinoDown = async () => {
    setLoading(true);
    try {
      const result = await sendArduinoDown();
      setStatus(result);
      if (!result) {
        throw new Error("Failed to send UP command");
      }
      showToast("명령 성공", "차수판이 내려갔습니다.", "success");
    } catch (error: any) {
      showToast("에러 발생", "차수판을 내리는 명령에 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && <Toast title={toast.title} body={toast.body} type={toast.type} />}

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
    </>
  );
};

export default ArduinoControl;