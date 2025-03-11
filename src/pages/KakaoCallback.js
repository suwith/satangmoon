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
            console.log("✅ 카카오 인가 코드:", code);

            // 백엔드로 인가 코드 전송하여 액세스 토큰 요청
            axios
              .post(`${BACKEND_URL}/api/oauth/kakao`, { code })
              .then((response) => {
                  localStorage.setItem("jwt", response.data.token);
                  navigate("/home"); // ✅ 로그인 성공 후 홈으로 이동

                  console.log(response.data.token)
              })
              .catch((error) => {
                  console.error("❌ 카카오 로그인 실패:", error);
                  navigate("/login?error=token_request_failed"); // 로그인 실패 시 에러 페이지 이동
              });
        } else {
            console.error("❌ 인가 코드가 없습니다.");
            navigate("/login?error=no_code");
        }
    }, [navigate]);

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
