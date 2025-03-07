import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    const token = localStorage.getItem("jwt");
    
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return token;
        } catch (error) {
            console.error("토큰 디코딩 실패:", error);
            return null;
        }
    }
    return null;
};

export const setToken = (token) => localStorage.setItem("jwt", token);

export const removeToken = () => localStorage.removeItem("jwt");
