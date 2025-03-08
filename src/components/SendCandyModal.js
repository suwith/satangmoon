import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { decodeUserInfo } from "../utils/UserUtils";
import useSendCandy from "../hooks/useSendCandy";
import candy1 from "../assets/candy1.svg";
import candy2 from "../assets/candy2.svg";
import candy3 from "../assets/candy3.svg";
import candy4 from "../assets/candy4.svg";
import candy5 from "../assets/candy5.svg";
import candy6 from "../assets/candy6.svg";

const candyDesigns = [candy1, candy2, candy3, candy4, candy5, candy6];

const SendCandyModal = ({ onClose }) => {
  const { id: receiverId } = useParams(); // URL에서 받는 사람 ID 추출
  const { sendCandy, loading, error, success } = useSendCandy();
  const [step, setStep] = useState(1); // 1: 디자인 선택, 2: 메시지 입력
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const senderId = decodeUserInfo().id; // 로그인한 유저 ID 가져오기
    const token = "YOUR_AUTH_TOKEN"; // 필요한 경우 인증 토큰 추가

    // 값이 올바르게 설정되었는지 확인
    console.log("보내는 사람 ID:", senderId);
    console.log("받는 사람 ID:", receiverId);
    console.log("메시지:", message);
    console.log("선택한 사탕 디자인 번호:", selectedDesign);

    if (!receiverId || !selectedDesign || !message.trim()) {
      console.error("필수 데이터가 누락되었습니다.");
      return;
    }

    sendCandy(senderId, receiverId, message, selectedDesign, token);
    onClose(); // 모달 닫기
  };

  useEffect(() => {
    console.log("📢 success 값 변경:", success); // ✅ success 변경 확인 로그
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 500); // ✅ 0.5초 후 새로고침
    }
  }, [success]);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-card bg-center bg-no-repeat bg-contain flex flex-col justify-between items-center p-6"
        style={{ width: "400px", height: "600px" }}
      >

        {/* 사탕 디자인 선택 화면 */}
        {step === 1 && (
          <div className="w-64 flex flex-col items-center justify-center text-center">
            <div className="w-full text-center text-sm mt-24 font-semibold">
              상대방에게 보낼 사탕을 골라주세요
            </div>

            <div className="grid grid-cols-2 gap-3 w-full h-80 my-5 place-items-center">
              {candyDesigns.map((candy, index) => (
                <img
                  key={index}
                  src={candy}
                  alt={`사탕 ${index + 1}`}
                  className={`cursor-pointer w-24 h-24 p-2 rounded-lg ${
                    selectedDesign === index + 1 ? "border-4 border-amber-950" : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedDesign(index + 1)}
                />
              ))}
            </div>

            <div className="flex w-full gap-2 mt-1.5">
              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-bold"
              >
                닫기
              </button>
              {/* 다음 버튼 */}
              <button
                onClick={() => selectedDesign && setStep(2)}
                className={`flex-1 bg-amber-950 text-white py-2 rounded-lg font-bold ${
                  !selectedDesign ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!selectedDesign}
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* 메시지 입력 화면 */}
        {step === 2 && (
          <div className="w-64 text-center">
            <div className="w-full text-center text-sm mt-24 font-semibold">
              사탕과 함께 보낼 메세지를 작성해주세요
            </div>

            <div className="w-full my-5">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="w-auto resize-none h-80 bg-transparent focus:border-none focus:outline-none hover:border-none"
              />
            </div>

            <div className="flex w-full gap-2">
              {/* 이전 버튼 */}
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-bold"
              >
                이전
              </button>
              {/* 사탕 보내기 버튼 */}
              <button
                onClick={handleSend}
                className={`flex-1 bg-amber-950 text-white py-2 rounded-lg font-bold ${
                  !message.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!message.trim()}
              >
                사탕 보내기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SendCandyModal;
