import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
    const navigate = useNavigate();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) {
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        console.log(urlParams);
        console.log(token);

        if (token) {
            localStorage.setItem("jwt", token);

            const returnUrl = localStorage.getItem("returnUrl");
            if (returnUrl) {
                localStorage.removeItem("returnUrl");
                processed.current = true;
                navigate(returnUrl);
            } else {
                processed.current = true;
                navigate('/home');
            }
        } else {
            processed.current = true;
            navigate('/');
        }
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
}

export default KakaoCallback;
