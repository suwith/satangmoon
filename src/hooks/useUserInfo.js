// hooks/useUserInfo.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // axios 인스턴스
import { useParams } from 'react-router-dom';
import { decodeUserInfo } from '../utils/UserUtils'; // 디코딩 유틸리티

const useUserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { id: paramId } = useParams(); // URL에서 id 추출
  const decodedUser = decodeUserInfo(); // decodeUserInfo에서 가져온 사용자 정보

  const id = paramId ? paramId : decodedUser.id; // decodeUserInfo().id가 있으면 그것을 사용하고, 없으면 Params에서 id를 사용

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // API 호출
        const response = await axiosInstance.get(`/chocolates/public/${id}`);
        // 사용자 정보 업데이트 (user 상태에 저장)
        setUser({
          id: id,
          name: response.data.nickname,
          candyCount: response.data.chocolateCount,
        });


      } catch (err) {
        setError('유저 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    if (id) { // id가 있을 때만 데이터를 가져옵니다.
      fetchUserData(); // 컴포넌트 마운트 시 호출
    }
  }, [id]); // id가 변경될 때마다 재호출

  return { user, loading, error };  // 사용자 데이터, 로딩 상태, 에러 상태를 반환
};

export default useUserInfo;
