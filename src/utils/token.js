import { jwtDecode } from "jwt-decode";

// export const getToken = () => localStorage.getItem("access_token");

//로그인 연결 전 테스트용 토큰
export const getToken = () => {
  const token = process.env.REACT_APP_USER_TOKEN;
  console.log("현재 토큰 값:", token);  // 콘솔에서 토큰 값을 확인
  const decoded = jwtDecode(token);
  console.log(decoded.sub);
  return token;
};

export const setToken = (token) => localStorage.setItem("access_token", token);

export const removeToken = () => localStorage.removeItem("access_token");

export const isTokenValid = () => { //로그인유무 확인하는 함수
    const token = getToken();
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // 만료 시간 확인
    } catch (error) {
        console.error("JWT 디코딩 오류:", error);
        return false;
    }
};
