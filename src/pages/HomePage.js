import React, { useEffect, useState } from 'react';
// 이미지
import caseEmpty from '../assets/candy_box.svg';
// 사탕 이미지 (design_type에 따라 사용)
import candy1 from "../assets/candy1.svg";
import candy2 from "../assets/candy2.svg";
import candy3 from "../assets/candy3.svg";
import candy4 from "../assets/candy4.svg";
import candy5 from "../assets/candy5.svg";
import candy6 from "../assets/candy6.svg";
import anonymousCandy from "../assets/candy_wrapped.svg";
// 더미데이터
import useCandy from '../hooks/useCandy';
// 아이콘
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import SendCandyModal from '../components/SendCandyModal';
import ReadCandyModal from '../components/ReadCandyModal';
import { useNavigate} from 'react-router-dom';
import candyLogo from '../assets/candy_logo.svg';
import { decodeUserInfo } from '../utils/UserUtils';
import useUserInfo from '../hooks/useUserInfo';
import { useLocation } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { FaSpinner } from 'react-icons/fa';
import { BsFillPatchQuestionFill } from 'react-icons/bs';

const mobileCandyPositions = [
  { top: "28.8%", left: "20.3%" },
  { top: "28.8%", left: "50%" },
  { top: "28.8%", left: "80.2%" },
  { top: "53.9%", left: "33.2%" },
  { top: "53.9%", left: "65.3%" },
  { top: "78.1%", left: "50%" }
];

const desktopCandyPositions = [
  { top: "28.8%", left: "23.5%" },
  { top: "28.8%", left: "50%" },
  { top: "28.8%", left: "76.4%" },
  { top: "53.9%", left: "35.4%" },
  { top: "53.9%", left: "63.3%" },
  { top: "78.1%", left: "50%" }
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
  const {user, loading, error} =  useUserInfo(); // 페이지 유저 정보
  const { logout } = useLogin();
  const decodedUser = decodeUserInfo(); // 로그인한 유저 정보
  const location = useLocation(); // 현재 경로 정보

  // 로그인한 유저의 KakaoId와 URL의 KakaoId 비교
  const isAuthorized = user?.id === decodedUser?.id;

  const navigate = useNavigate();

  // useCandy 훅을 사용하여 API 데이터를 가져옴
  const { candyList } = useCandy();

  // 현재 페이지 (0: 첫 번째 상자, 1: 두 번째 상자 ...)
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandy, setSelectedCandy] = useState(null);
  const [candyPositions, setCandyPositions] = useState(desktopCandyPositions);

  // 전체 페이지 수 계산 (user.candyCount가 있을 때는 그것을 기준으로 페이지 수 계산)
  const totalPages = isAuthorized
    ? Math.ceil(candyList.length / 6) // 사탕 개수를 6으로 나눈 후 올림
    : Math.ceil((user?.candyCount ?? 0) / 6); // undefined 방지

  // 현재 페이지의 사탕 리스트 (6개씩 슬라이싱)
  const candyOnPage = isAuthorized
    ? candyList.slice(currentPage * 6, Math.min((currentPage + 1) * 6, candyList.length))
    : Array.from({ length: user?.candyCount }).map((_, index) => ({
      visibilityStatus: "ANONYMOUS",
      id: index,
    }));

  // 사탕 클릭 핸들러
  const handleCandyClick = (candy) => {
    if (candy.visibilityStatus === "MUTUAL" || "EXPIRED") {
      setSelectedCandy(candy);
    }
  };

  const handleSendCandyClick = () => {
    // 로그인 여부 확인
    if (!decodedUser) { // 로그인하지 않은 유저
      alert("로그인이 필요한 기능입니다."); // 알림 팝업 띄우기
      localStorage.setItem("returnUrl", location.pathname);
      navigate("/");
      return;
    }

    // 사탕 보내기 알림창
    const isConfirmed = window.confirm("사탕을 보낼 수 있는 기회는 한 번뿐이에요. 소중한 마음을 신중하게 작성해주세요!");

    if (isConfirmed) {
      setIsModalOpen(true); // 확인을 눌렀을 때만 모달 열기
    }
  };


  // 내 사탕함 가기 버튼 클릭 시 처리
  const handleGoToCandyBox = () => {
    if (decodedUser) {
      // 로그인한 유저가 있을 경우 /user.KakaoId 경로로 이동
      navigate(`/home`);
    } else {
      // 로그인하지 않은 유저는 로그인 페이지로 이동
      navigate("/");
    }
  };
  const handleCopyLink = () => {
    const shareableLink = `www.satangmoon.com/${decodedUser.id}`;

    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        alert("링크가 복사되었습니다! 🎉");
      })
      .catch(err => {
        console.error("링크 복사 실패:", err);
        alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
      });
  };

  let hideGuide = localStorage.getItem('hideGuide');
  if (hideGuide === null) {
    localStorage.setItem('hideGuide', 'false');
    hideGuide = 'false';
  }

  const [showGuide, setShowGuide] = useState(hideGuide !== 'true');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const closeGuide = () => {
    if(dontShowAgain){
      localStorage.setItem('hideGuide', 'true');
    }
    setShowGuide(false);
  }
  const [showGuide2, setShowGuide2] = useState(false);

  const openGuide2 = () => {
    setShowGuide2(true);
  }
  const closeGuide2 = () => {
    setShowGuide2(false);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // 모바일 환경
        setCandyPositions(mobileCandyPositions);
      } else {
        // 데스크톱 환경
        setCandyPositions(desktopCandyPositions);
      }
    };

    handleResize(); // 초기 로딩 시에도 한 번 실행
    window.addEventListener("resize", handleResize); // 화면 크기 변경 시 감지

    return () => window.removeEventListener("resize", handleResize); // 클린업
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-full justify-center items-center min-h-screen">
        <div className="flex w-full h-full flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-pink-300 mb-4" />
        </div>
      </div>);
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screene">
        <div className="flex flex-col items-center">
          <p>{error}</p>
          현재 서버 점검중입니다.
          10분 뒤 다시 시도해주세요.
        </div>
      </div>);
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm mx-auto shadow-lg px-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">사탕문 이용 안내 🍬</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <span className="text-primary font-bold mr-2">1.</span>
                <p><span className="font-bold">화이트데이 전날(3월 13일)</span>까지 익명으로 사탕과 메시지를 보낼 수 있어요.</p>
              </div>

              <div className="flex items-start">
                <span className="text-primary font-bold mr-2">2.</span>
                <p>보낸 메세지는 <span className="font-bold">화이트데이(3월 14일)</span>까지 <span className="font-bold">확인할 수 없어요.</span></p>
              </div>

              <div className="flex items-start">
                <span className="text-primary font-bold mr-2">3.</span>
                <p><span className="font-bold">서로 사탕을 보냈다면</span>, 화이트데이에 <span className="font-bold">이름과 메시지를 확인</span>할 수 있어요.</p>
              </div>

              <div className="flex items-start">
                <span className="text-primary font-bold mr-2">4.</span>
                <p>그 외의 사탕은 <span className="font-bold">3월 15일부터 익명으로 메시지가 공개</span>돼요.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">💌 마음을 전할 준비 되셨나요?</p>
              <p className="text-gray-600">소중한 사람에게 사탕을 보내보세요!</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="dontShowAgain" className="text-sm text-gray-600">다시 보지 않기</label>
              </div>
              <button
                onClick={closeGuide}
                className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {showGuide2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm mx-auto shadow-lg px-10">
            <h3 className="text-xl font-bold mb-10 text-center text-primary">오류 관련 공지</h3>

            <div className="space-y-4 mb-10">
              <div className="flex flex-col">
                <p>Q. 내 사탕함에 사탕이 안 떠요!</p>
                <p>A. 최초 로그인시 발급된 토큰이 만료되어 발생하는 오류로 로그아웃 후 재로그인 해주세요.</p>
              </div>
            </div>

            <div className="mt-8 text-center text-sm">
              <p className="text-gray-600">오류사항 관련 문의는 <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSevBldlDf-TXg2dfBmmRXFOSqyMcSf4-9k6NAwYMbJIRh0TaQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline font-bold"
              >
                이곳
              </a>
                에서, </p>
              <p className="text-gray-600">그외 문의 사항은 인스타그램 <a
                href="https://www.instagram.com/satang.moon?igsh=NTZnaTg0NjJ2MTJx&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-800 underline font-bold"
              >
                @satang.moon
              </a>으로 연락주세요!</p>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                onClick={closeGuide2}
                className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center h-full my-7 relative w-full">
        <img src={candyLogo} alt="candyLogo" className="w-28 h-auto object-contain" />
        <BsFillPatchQuestionFill className="absolute w-6 h-6 right-4 text-yellow-800"
                                 onClick={openGuide2}/>
      </div>

      <div className="flex justify-center items-center h-full my-7 relative w-full">
        <img src={candyLogo} alt="candyLogo" className="w-28 h-auto object-contain" />
        <BsFillPatchQuestionFill className="absolute w-6 h-6 right-4 text-yellow-800"
                                 onClick={openGuide2}/>
      </div>

      <div className="w-full max-w-sm justify-center h-full relative">

        {/* 사탕 개수 표시 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-1">{(isAuthorized)? decodedUser.name : user?.name}님의 사탕함</h2>
          <div className="text-gray-500 text-md font-bold">
            {
              isAuthorized ? (
                  candyList.length > 0
                    ? `${candyList.length}개의 사탕이 담겨 있어요`
                    : "아직 담긴 사탕이 없어요"
              ) : user?.candyCount > 0
                ? `${user?.candyCount}개의 사탕이 담겨 있어요`
                : "아직 담긴 사탕이 없어요"
            }

          </div>
        </div>

        {/* 사탕 박스 컨테이너 */}
        <div className="relative w-[90vw] max-w-[400px] aspect-[6/5] flex justify-center">
        <img
            src={caseEmpty}
            alt="사탕 상자"
            className="w-full h-auto object-contain"
          />

          {/* 사탕 배치 (design_type에 따라 이미지 변경) */}
          {isAuthorized ? (
            // 페이지 주인이 user일 때는 사탕을 익명 또는 디자인에 따라 표시
            candyOnPage.map((candy, index) => (
              <img
                key={candy.id}
                src={candy.visibilityStatus === "ANONYMOUS" ? anonymousCandy :  candyImages[candy.designType] }
                alt={`사탕 ${candy.visibilityStatus === "ANONYMOUS" ? "익명" : candy.designType}`}
                className={`absolute w-[15%] cursor-${candy.visibilityStatus === "ANONYMOUS" ? "not-allowed" : "pointer"}`}
                style={{
                  top: candyPositions[index % 6].top,
                  left: candyPositions[index % 6].left,
                  transform: "translate(-50%, -50%)"
                }}
                onClick={() => {
                  if (isAuthorized && candy.visibilityStatus !== "ANONYMOUS") {
                    handleCandyClick(candy); // 로그인된 유저의 KakaoId와 URL의 KakaoId가 같을 때만 클릭 가능
                  }
                }}
              />
            ))
          ) : (
            // 로그인된 유저가 페이지 주인이 아닌 경우 익명 사탕만 표시
            Array.from({ length: Math.min(6, (user?.candyCount ?? 0) - currentPage * 6) }).map((_, index) => (
              <img
                key={currentPage * 6 + index} // 고유한 key 유지
                src={anonymousCandy}
                alt={`익명 사탕 ${currentPage * 6 + index + 1}`}
                className="absolute w-[15%] cursor-not-allowed"
                style={{
                  top: candyPositions[index % 6].top,
                  left: candyPositions[index % 6].left,
                  transform: "translate(-50%, -50%)"
                }}
              />
            ))
          )}


          {/* 페이지네이션 버튼 (양옆에 배치) */}
          {totalPages > 1 && (
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
            senderName={selectedCandy.visibilityStatus === "ANONYMOUS" ? "익명" : selectedCandy.sender}
            message={selectedCandy.message}
          />
        )}

        {isModalOpen && <SendCandyModal onClose={() => setIsModalOpen(false)} />}

        {isAuthorized ? (
          <div className="flex items-center justify-center mt-10">
            <button
              className="flex-1 h-12 w-full bg-pink-200 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center px-5 py-6 shadow-gray-400 shadow-md"
              onClick={handleCopyLink}
            >
              내 사탕함 공유 링크 복사하기
            </button>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 items-center justify-center mt-10">
            {/* 버튼 */}
            <button
              onClick={handleSendCandyClick}
              className="flex-1 h-12 bg-pink-200 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center px-5 py-6 shadow-gray-400 shadow-md"
              disabled={isAuthorized}
            >
              사탕 보내기
            </button>
            <button
              onClick={handleGoToCandyBox}  // 내 사탕함 가기 버튼 클릭 시 리디렉션
              className="flex-1 h-12 bg-yellow-100 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center px-5 py-6 shadow-gray-400 shadow-md"
            >
              내 사탕함 가기
            </button>
          </div>
        )}

        {/* 로그아웃 버튼 */}
        {decodedUser && (
          <div className="flex justify-center mt-4">
            <button
              className="text-gray-500 text-sm underline hover:text-gray-700"
              onClick={ logout }
            >
              로그아웃
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;
