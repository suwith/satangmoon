import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // URL의 쿼리 파라미터에서 토큰 추출
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log("받은 토큰:", token);

        if (token) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("jwt", token);
            console.log("토큰 저장 완료");
            
            // window.location.href를 사용하여 홈으로 이동
            window.location.href = "http://localhost:3000/home";
            // 또는
            // window.location.replace("http://localhost:3000/home");
        } else {
            console.log("토큰이 없습니다");
            window.location.href = "http://localhost:3000";
        }
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
