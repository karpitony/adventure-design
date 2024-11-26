import { getToken } from "firebase/messaging";
import { messaging } from "@/config/Firebase";

let fcmToken: string | null = null;

const getFcmToken = async (): Promise<{ token?: string; message: string; permission: NotificationPermission }> => {

  if (fcmToken) {
    return { token: fcmToken, message: "이미 알림이 활성화되어 있습니다.", permission: 'granted' };
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      const permission = await window.Notification.requestPermission();

      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const currentToken:string = await getToken(messaging, { 
          vapidKey : 'BHKxrpsR_kM0oNfZlaZh2SDWXkRhNtIac_hhDop8a5ukXVZcBbSmHl-nfZMYr6mFCMj1nVT2FkbkkqgtXbZxqBQ' 
        });

        if (currentToken) {
          fcmToken = currentToken;
          console.log('Token:', currentToken);
          return { token: currentToken, message: "알림이 활성화되었습니다.", permission };
        } else {
          console.log('No registration token available.');
          return { message: "등록 토큰이 없습니다.", permission };
        }
      } else {
        console.log('Permission denied.');
        return { message: "알림 권한이 거부되었습니다.", permission };
      }
    } catch (err) {
      console.error('Error in notification permission or token retrieval', err);
      return { message: "알림 설정 중 오류가 발생했습니다.", permission: 'default' };
    }
  } else {
    console.warn('This browser does not support notifications.');
    return { message: "이 브라우저는 알림을 지원하지 않습니다.", permission: 'default' };
  }
};

export default getFcmToken;