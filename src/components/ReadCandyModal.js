import React from "react";

const ReadCandyModal = ({ isOpen, onClose, senderName, message }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링 X

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* 배경 이미지 크기 적용 */}
      <div
        className="relative bg-card bg-center bg-no-repeat bg-contain flex flex-col justify-between items-center p-6"
        style={{
          width: "400px",  // 크기 조정
          height: "600px",
        }}
      >
        <div className="w-64 text-center">
        {/* 발신자 이름 (항상 하단 고정) */}
        <div className="w-full flex text-center text-lg mt-24 font-semibold">
          {(senderName === "Anonymous")? "익명": senderName}님이 보낸 사탕메세지
        </div>


        {/* 메시지 내용 (왼쪽 정렬 & 중앙 배치) */}
          <div className="flex-1 flex pt-4 w-64 h-80">
            <div className="text-lg w-full py-5 px-2 overflow-y-auto max-h-80">
              {message}
            </div>
          </div>


          {/* 닫기 버튼 (오른쪽 상단) */}
        <button
          onClick={onClose}
          className=" w-full h-12 content-center mb-4 mt-1.5 bg-pink-200 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center shadow-gray-400 shadow-md"
        >
          닫기
        </button>

      </div>
      </div>
    </div>
  );
};

export default ReadCandyModal;
