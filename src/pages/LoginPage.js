import { useNavigate } from "react-router-dom";
import candyLogo from "../assets/candy_logo.svg";
import useLogin from "../hooks/useLogin";
import { decodeUserInfo } from '../utils/UserUtils';
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { kakaoLogin } = useLogin();

  useEffect(() => {
    const decodedUser = decodeUserInfo();
    if (decodedUser) {
      navigate('/home');
    }
  }, [navigate]);


  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* 하트 아이콘 */}
      <div className="relative w-5/6 flex justify-center mb-16">
        <img src={candyLogo} alt="candyLogo" className="w-full h-auto object-contain" />
      </div>

      {/* Kakao 로그인 버튼 */}
      <button
        onClick={kakaoLogin}
        className="w-64 h-12 bg-yellow-400 text-black font-bold rounded-lg shadow-md flex items-center justify-center"
      >
        Kakao 로그인
      </button>
    </div>
  );
}

export default LoginPage;
