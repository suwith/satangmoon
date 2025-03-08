import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useSendCandy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendCandy = async (senderId, receiverId, message, designType, token) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // senderId, receiverId를 integer로 변환
    const senderIdInt = parseInt(senderId, 10);
    const receiverIdInt = parseInt(receiverId, 10);

    console.log("📌 API 요청 데이터 확인:");
    console.log("senderId (int):", senderIdInt);
    console.log("receiverId (int):", receiverIdInt);
    console.log("message:", message);
    console.log("designType:", designType);
    console.log("token:", token);

    if (isNaN(senderIdInt) || isNaN(receiverIdInt)) {
      console.error("🚨 senderId 또는 receiverId가 숫자로 변환되지 않음!");
      setError("잘못된 사용자 ID 형식입니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/chocolates",
        {}, // ✅ body는 비우고
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
        console.log("🎉 사탕 전송 성공:", response.data);
        console.log("📢 success 값 변경:", success); // ✅ success 변경 확인 로그
      }
    } catch (err) {
      console.error("🚨 에러 발생:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : "메시지를 보내는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { sendCandy, loading, error, success };
};

export default useSendCandy;
