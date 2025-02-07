import React from "react";
import { IoClose } from "react-icons/io5"; // X 아이콘

const ReadChocoModal = ({ isOpen, onClose, senderName, message }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링 X

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* 배경 이미지 크기 적용 */}
      <div
        className="relative bg-letter bg-center bg-no-repeat bg-contain flex flex-col justify-between items-center p-6"
        style={{
          width: "400px",  // 크기 조정
          height: "600px",
        }}
      >
        {/* 닫기 버튼 (오른쪽 상단) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-24 text-gray-700 hover:text-gray-900"
        >
          <IoClose className="w-6 h-6" />
        </button>

        {/* 메시지 내용 (왼쪽 정렬 & 중앙 배치) */}
        <div className="flex-1 flex py-32 w-full px-16">
          <div className="text-white text-xl font-semibold w-full">
            {message}
          </div>
        </div>

        {/* 발신자 이름 (항상 하단 고정) */}
        <div className="w-full text-center text-3xl pl-10 mb-3 text-white font-semibold">
          {senderName}
        </div>
      </div>
    </div>
  );
};

export default ReadChocoModal;
