import React, { useState } from "react";
import choco1 from "../assets/chocolate1.svg";
import choco2 from "../assets/chocolate2.svg";
import choco3 from "../assets/chocolate3.svg";
import choco4 from "../assets/chocolate4.svg";
import choco5 from "../assets/chocolate5.svg";
import choco6 from "../assets/chocolate6.svg";

const chocolateDesigns = [choco1, choco2, choco3, choco4, choco5, choco6];

const SendChocolateModal = ({ onClose }) => {
  const [step, setStep] = useState(1); // 1: 디자인 선택, 2: 메시지 입력
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("초콜릿 디자인 번호:", selectedDesign);
    console.log("메시지:", message);
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {/* 초콜릿 디자인 선택 화면 */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">초콜릿 디자인 선택</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {chocolateDesigns.map((choco, index) => (
                <img
                  key={index}
                  src={choco}
                  alt={`초콜릿 ${index + 1}`}
                  className={`cursor-pointer w-20 h-20 p-2 rounded-lg ${
                    selectedDesign === index + 1 ? "border-4 border-amber-950" : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedDesign(index + 1)}
                />
              ))}
            </div>
            <button
              onClick={() => selectedDesign && setStep(2)}
              className={`w-full bg-amber-950 text-white py-2 rounded-lg font-bold ${
                !selectedDesign ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedDesign}
            >
              다음
            </button>
          </div>
        )}

        {/* 메시지 입력 화면 */}
        {step === 2 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">메시지 작성</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="w-full p-2 border border-gray-300 rounded-lg h-24 mb-4"
            />
            <button
              onClick={handleSend}
              className="w-full bg-amber-950 text-white py-2 rounded-lg font-bold"
            >
              초콜릿 보내기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendChocolateModal;
