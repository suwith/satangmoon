import { useState } from "react"; // ✅ useState 추가

const BASE_URL = process.env.REACT_APP_BASE_URL;
const KAKAO_AUTH_URL = `${BASE_URL}/oauth2/authorization/kakao`;

const useLogin = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // ✅ 카카오 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동
    const kakaoLogin = (returnUrl = null) => {
        window.location.replace(KAKAO_AUTH_URL);
    };

    const logout = () => {
        // localStorage에서 토큰 제거
        localStorage.removeItem("jwt");
        // 다른 저장된 데이터도 필요하다면 제거
        localStorage.removeItem("returnUrl");
        
        // 홈페이지로 리다이렉트
        window.location.href = "/";
    };

    return { kakaoLogin, logout, user, error };
};

export default useLogin;
