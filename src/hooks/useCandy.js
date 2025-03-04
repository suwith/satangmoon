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
        const kakaoId = decodeUserInfo().userKakaoId;
        // const kakaoId = process.env.REACT_APP_USER_KAKAOID;
        console.log(kakaoId);
        // API 호출 (백엔드 API URL을 넣어주세요)
        const response = await axiosInstance.get(`/chocolates/${kakaoId}`);
        console.log(response);

        // API 데이터 매핑
        const mappedCandyList = response.data.map((item) => ({
          id: item.id,
          message: item.message,
          designType: item.designType,
          isMutual: item.isMutual,
          sender: {
            id: item.sender.id,
            name: item.sender.name,
            email: item.sender.email,
            shareableLink: item.sender.shareableLink
          },
          receiver: {
            id: item.receiver.id,
            name: item.receiver.name,
            email: item.receiver.email,
            shareableLink: item.receiver.shareableLink
          },
          sentAt: item.sentAt,
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
