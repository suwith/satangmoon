import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // 로딩 아이콘 추가

const BACKEND_URL = process.env.REACT_APP_BASE_URL;

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      axios
        .post(`${BACKEND_URL}/api/oauth/kakao`, { code })
        .then((response) => {
          localStorage.setItem("jwt", response.data.token);
          navigate("/home");
        })
        .catch((error) => {
          console.error("카카오 로그인 실패:", error);
          navigate("/login?error=token_request_failed");
        });
    } else {
      console.error("인가 코드가 없습니다.");
      navigate("/login?error=no_code");
    }
  }, [navigate]);

  return (
    <div className="flex w-full h-full justify-center items-center min-h-screen">
      <div className="flex w-full h-full flex-col items-center">
        <FaSpinner className="animate-spin text-4xl text-pink-300 mb-4" />
      </div>
    </div>
  );
};

export default KakaoCallback;
