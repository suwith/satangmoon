// hooks/useUserInfo.js
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state/userState';  // userState Atom
import axiosInstance from '../utils/axiosInstance'; // axios 인스턴스
import { decodeUserInfo } from '../utils/UserUtils'; // 디코딩 유틸리티

const useUserInfo = () => {
  const setUser = useSetRecoilState(userState); // Recoil 상태 업데이트 함수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const decodedUserInfo = decodeUserInfo(); // 디코딩해서 유저 카카오 ID 가져오기

      if (!decodedUserInfo || !decodedUserInfo.userKakaoId) {
        setError("유효한 사용자 정보를 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      const { userKakaoId } = decodedUserInfo;
      // const userKakaoId = process.env.REACT_APP_USER_KAKAOID;

      try {
        // API 호출
        const response = await axiosInstance.get(`/api/users/${userKakaoId}`);
        // 사용자 정보 업데이트 (userState에 저장)
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          shareableLink: response.data.shareableLink
        });


      } catch (err) {
        setError('유저 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // 컴포넌트 마운트 시 호출
  }, [setUser]);

  return { loading, error };  // 로딩 및 에러 상태를 반환
};

export default useUserInfo;
