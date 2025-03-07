// hooks/useCandy.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { decodeUserInfo } from '../utils/UserUtils';

const useCandy = () => {
  const [candyList, setCandyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandyData = async () => {
      try {
        const id = decodeUserInfo().id;
        const response = await axiosInstance.get(`/chocolates/${id}`);
        // API 데이터 매핑
        const mappedCandyList = response.data.map((item) => ({
          id: item.id,
          message: item.message,
          designType: item.designType,
          sender: item.sender.name,
          visibilityStatus: item.visibilityStatus
        }));

        // 매핑된 데이터로 상태 업데이트
        setCandyList(mappedCandyList);
      } catch (err) {
        setError('사탕 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchCandyData(); // API 데이터 가져오기
  }, []); // 컴포넌트가 마운트될 때만 호출

  return { candyList, loading, error };
};

export default useCandy;
