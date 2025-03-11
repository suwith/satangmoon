import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BASE_URL;

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            // 백엔드로 인가 코드 전송하여 액세스 토큰 요청
            axios
              .post(`${BACKEND_URL}/api/oauth/kakao`, { code })
              .then((response) => {
                  localStorage.setItem("jwt", response.data.token);
                  navigate("/home");
              })
              .catch((error) => {
                  console.error("카카오 로그인 실패:", error);
                  navigate("/login?error=token_request_failed"); // 로그인 실패 시 에러 페이지 이동
              });
        } else {
            console.error("인가 코드가 없습니다.");
            navigate("/login?error=no_code");
        }
    }, [navigate]);

    return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback;
