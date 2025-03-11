import { useState } from "react";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const useLogin = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // ✅ 카카오 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동
    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 페이지로 이동
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("returnUrl");
        window.location.href = "/";
    };

    return { kakaoLogin, logout, user, error };
};

export default useLogin;
