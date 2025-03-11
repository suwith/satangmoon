import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { getToken } from '../utils/token';
import useUserInfo from './useUserInfo';

const useSendCandy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = useUserInfo();

  const sendCandy = async (senderId, receiverId, message, designType) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = getToken();


    // senderId, receiverId를 integer로 변환
    const senderIdInt = parseInt(senderId, 10);
    const receiverIdInt = parseInt(receiverId, 10);

    if (isNaN(senderIdInt) || isNaN(receiverIdInt)) {
      console.error("🚨 senderId 또는 receiverId가 숫자로 변환되지 않음!");
      setError("잘못된 사용자 ID 형식입니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/chocolates",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          params: { // ✅ integer 변환된 값으로 API 호출
            senderId: senderIdInt,
            receiverId: receiverIdInt,
            message,
            designType
          }
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        window.location.reload();
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          alert(`${user.name}님에게 이미 사탕 메세지를 보낸 적이 있어요!`);
        } else {
          setError(err.response.data.message || "메시지를 보내는 데 실패했습니다.");
        }
      } else {
        setError("서버에 연결할 수 없습니다.");}
    } finally {
      setLoading(false);
    }
  };

  return { sendCandy, loading, error, success };
};

export default useSendCandy;
