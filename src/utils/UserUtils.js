import {jwtDecode} from "jwt-decode";
import {getToken} from "./token";
/**
 * JWT에서 사용자 정보를 디코딩하는 함수
 * @returns {{ id: number, name: string, email: string, shareableLink: string } | null} 사용자 정보 객체 또는 null
 */


export const decodeUserInfo = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return {
            id: decoded.sub,
            exp: decoded.exp,
            name: decoded.name,
            email: decoded.email,
            shareableLink: decoded.shareableLink,
        };
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};
