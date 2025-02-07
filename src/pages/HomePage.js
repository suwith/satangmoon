import React, { useState } from "react";
// 이미지
import caseEmpty from '../assets/chocolate_case_empty.svg';
import caseDefault from '../assets/chocolate_case.svg';
import chocoIcon from '../assets/chocolate_logo.svg';
import letterIcon from "../assets/letter_icon.svg";
// 초콜릿 이미지 (design_type에 따라 사용)
import choco1 from "../assets/chocolate1.svg";
import choco2 from "../assets/chocolate2.svg";
import choco3 from "../assets/chocolate3.svg";
import choco4 from "../assets/chocolate4.svg";
import choco5 from "../assets/chocolate5.svg";
import choco6 from "../assets/chocolate6.svg";
import anonymousChoco from "../assets/chocolate.png";
// 더미데이터
import { users } from "../data/UserData";
import { chocolates } from "../data/ChocolateData";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SendChocoModal from '../components/SendChocoModal';
import ReadChocoModal from '../components/ReadChocoModal';

// 초콜릿이 배치될 위치 (각 페이지별 6개씩)
const chocolatePositions = [
  { top: "29.5%", left: "27%" },
  { top: "29.5%", left: "50.3%" },
  { top: "29.5%", left: "73.5%" },
  { top: "54%", left: "37.5%" },
  { top: "54%", left: "62%" },
  { top: "77.5%", left: "50.3%" }
];

// 초콜릿 이미지 매핑
const chocolateImages = {
  1: choco1,
  2: choco2,
  3: choco3,
  4: choco4,
  5: choco5,
  6: choco6
};

const HomePage = () => {
  const user = users[0];
  const chocoList = chocolates;

  // 현재 페이지 (0: 첫 번째 상자, 1: 두 번째 상자 ...)
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChoco, setSelectedChoco] = useState(null); // 클릭된 초콜릿 데이터

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(chocoList.length / 6);

  // 현재 페이지의 초콜릿 리스트 (6개씩 슬라이싱)
  const chocolatesOnPage = chocoList.slice(
    currentPage * 6,
    Math.min((currentPage + 1) * 6, chocoList.length)
  );

  // 초콜릿 클릭 핸들러
  const handleChocoClick = (choco) => {
    if (choco.is_mutual) {
      setSelectedChoco(choco);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm relative">
        {/* 초콜릿 개수 표시 */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-semibold mb-4">{user.real_name}님의 초콜릿함</h2>
          <div className="text-gray-500 text-xl font-bold">
            {chocoList.length > 0
              ? `${chocoList.length}개의 초콜릿이 담겨 있어요`
              : "아직 담긴 초콜릿이 없어요"}
          </div>
        </div>

        {/* 초콜릿 박스 컨테이너 */}
        <div className="relative w-full aspect-[4/3] flex justify-center">
          <img
            src={chocoList.length > 0 ? caseDefault : caseEmpty}
            alt="초콜릿 상자"
            className="w-full h-auto object-contain"
          />

          {/* 초콜릿 배치 (design_type에 따라 이미지 변경) */}
          {chocolatesOnPage.map((choco, index) => (
            <img
              key={choco.id}
              src={choco.is_mutual ? chocolateImages[choco.design_type] : anonymousChoco} // 익명 여부에 따라 이미지 변경
              alt={`초콜릿 ${choco.is_mutual ? choco.design_type : "익명"}`}
              className={`absolute w-[15%] cursor-${choco.is_mutual ? "pointer" : "not-allowed"}`}
              style={{
                top: chocolatePositions[index % 6].top,
                left: chocolatePositions[index % 6].left,
                transform: "translate(-50%, -50%)"
              }}
              onClick={() => handleChocoClick(choco)}
            />
          ))}

          {/* 페이지네이션 버튼 (양옆에 배치) */}
          {chocoList.length > 6 && (
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
        {selectedChoco && (
          <ReadChocoModal
            isOpen={!!selectedChoco}
            onClose={() => setSelectedChoco(null)}
            senderName={users.find(u => u.id === selectedChoco.sender_id)?.real_name || "익명"}
            message={selectedChoco.message}
          />
        )}

        {isModalOpen && <SendChocoModal onClose={() => setIsModalOpen(false)} />}

        {/* 버튼 */}
        <div className="flex flex-col space-y-4 items-center justify-center mt-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-12 bg-amber-950 text-white flex justify-center items-center rounded-lg font-bold text-center px-3 py-2 shadow-gray-500 shadow-md"
          >
            <img src={chocoIcon} alt="초콜릿 보내기" className="w-7 h-7 mr-2" />
            {user.real_name}님에게 초콜릿 보내기
          </button>



<button className="w-full h-12 bg-red-300 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center p-1 shadow-gray-500 shadow-md">
            <img src={letterIcon} alt="초콜릿함 보기" className="w-7 h-7 mr-2" />
            내 초콜릿함 보러가기
          </button>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
