import React, { useState } from "react";
// 이미지
import caseEmpty from '../assets/candy_box.svg';
// 사탕 이미지 (design_type에 따라 사용)
import candy1 from "../assets/candy1.svg";
import candy2 from "../assets/candy2.svg";
import candy3 from "../assets/candy3.svg";
import candy4 from "../assets/candy4.svg";
import candy5 from "../assets/candy5.svg";
import candy6 from "../assets/candy6.svg";
import anonymousCandy from "../assets/candy_icon.svg";
// 더미데이터
import { users } from "../data/UserData";
import { candy } from "../data/CandyData";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SendCandyModal from '../components/SendCandyModal';
import ReadCandyModal from '../components/ReadCandyModal';
import { useNavigate } from 'react-router-dom';
import candyLogo from '../assets/candy_logo.svg';

// 사탕이 배치될 위치 (각 페이지별 6개씩)
const candyPositions = [
  { top: "28.8%", left: "23.5%" },
  { top: "28.8%", left: "50%" },
  { top: "28.8%", left: "76.6%" },
  { top: "53.6%", left: "37.5%" },
  { top: "53.6%", left: "63.3%" },
  { top: "77.5%", left: "50%" }
];

// 사탕 이미지 매핑
const candyImages = {
  1: candy1,
  2: candy2,
  3: candy3,
  4: candy4,
  5: candy5,
  6: candy6
};

const HomePage = () => {
  const user = users[0];
  const candyList = candy;
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 현재 페이지 (0: 첫 번째 상자, 1: 두 번째 상자 ...)
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandy, setSelectedCandy] = useState(null); // 클릭된 사탕 데이터

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(candyList.length / 6);

  // 현재 페이지의 사탕 리스트 (6개씩 슬라이싱)
  const candyOnPage = candyList.slice(
    currentPage * 6,
    Math.min((currentPage + 1) * 6, candyList.length)
  );

  // 사탕 클릭 핸들러
  const handleCandyClick = (candy) => {
    if (candy.is_mutual) {
      setSelectedCandy(candy);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="flex relative justify-center h-full my-7">
        <img src={candyLogo} alt="candyLogo" className="w-28 h-auto object-contain" />
      </div>

      <div className="w-full max-w-sm justify-center h-full relative">


        {/* 사탕 개수 표시 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-1">{user.real_name}님의 사탕함</h2>
          <div className="text-gray-500 text-md font-bold">
            {candyList.length > 0
              ? `${candyList.length}개의 사탕이 담겨 있어요`
              : "아직 담긴 사탕이 없어요"}
          </div>
        </div>

        {/* 사탕 박스 컨테이너 */}
        <div className="relative w-full aspect-[6/5] flex justify-center">
          <img
            src={caseEmpty}
            alt="사탕 상자"
            className="w-full h-auto object-contain"
          />

          {/* 사탕 배치 (design_type에 따라 이미지 변경) */}
          {candyOnPage.map((candy, index) => (
            <img
              key={candy.id}
              src={candy.is_mutual ? candyImages[candy.design_type] : anonymousCandy} // 익명 여부에 따라 이미지 변경
              alt={`사탕 ${candy.is_mutual ? candy.design_type : "익명"}`}
              className={`absolute w-[15%] cursor-${candy.is_mutual ? "pointer" : "not-allowed"}`}
              style={{
                top: candyPositions[index % 6].top,
                left: candyPositions[index % 6].left,
                transform: "translate(-50%, -50%)"
              }}
              onClick={() => handleCandyClick(candy)}
            />
          ))}

          {/* 페이지네이션 버튼 (양옆에 배치) */}
          {candyList.length > 6 && (
            <>
              {currentPage > 0 && (
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 hover:text-gray-400"
                >
                  <IoIosArrowBack className="h-6 w-6" />
                </button>
              )}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-gray-400"
                >
                  <IoIosArrowForward className="h-6 w-6" />
                </button>
              )}
            </>
          )}
        </div>

        {/* 페이지 인디케이터 (동그라미) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentPage === index ? "bg-amber-950" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}


        {/* 메시지 모달 */}
        {selectedCandy && (
          <ReadCandyModal
            isOpen={!!selectedCandy}
            onClose={() => setSelectedCandy(null)}
            senderName={users.find(u => u.id === selectedCandy.sender_id)?.real_name || "익명"}
            message={selectedCandy.message}
          />
        )}

        {isModalOpen && <SendCandyModal onClose={() => setIsModalOpen(false)} />}

        {/* 버튼 */}
        <div className="flex flex-row space-x-2 items-center justify-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 h-12 bg-pink-200 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center px-5 py-6 shadow-gray-400 shadow-md"
          >
            사탕 보내기
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 h-12 bg-yellow-100 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center px-5 py-6 shadow-gray-400 shadow-md"
          >
            내 사탕함 가기
          </button>
        </div>


      </div>
    </div>
  );
};

export default HomePage;
