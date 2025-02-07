import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import heartIcon from "../assets/heart_icon.svg";
import To from '../assets/To.svg';
import MyValentine from "../assets/MyValentine.svg";
import From from "../assets/From.svg";

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* "To." 텍스트 */}
      <img src={To} alt="To" className="mb-5" />

      {/* "My Valentine" 텍스트 */}
      <img src={MyValentine} alt="My Valentine" className="mb-10" />

      {/* 하트 아이콘 */}
      <div className="relative flex justify-center mb-16">
        <img src={heartIcon} alt="Heart Icon" className="w-full h-auto object-contain" />
      </div>

      {/* "From." 텍스트 */}
      <img src={From} alt="From" className="w-20 mt-2 mb-6" />

      {/* Kakao 로그인 버튼 */}
      <button
        onClick={() => navigate("/home")} // 버튼 클릭 시 "/home"으로 이동
        className="w-64 h-12 bg-yellow-400 text-black font-bold rounded-lg shadow-md flex items-center justify-center"
      >
        Kakao 로그인
      </button>
    </div>
  );
}

export default LoginPage;
