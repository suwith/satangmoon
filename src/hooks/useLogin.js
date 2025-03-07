import { useState } from "react"; // ✅ useState 추가

const BASE_URL = process.env.REACT_APP_BASE_URL;
const KAKAO_AUTH_URL = `${BASE_URL}/oauth2/authorization/kakao`;

const useLogin = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // ✅ 카카오 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동
    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return { kakaoLogin, user, error };
};

export default useLogin;
