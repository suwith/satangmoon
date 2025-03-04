// state/userState.js
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',  // 상태의 고유 키
  default: null,     // 기본값은 null (로그인 전에는 user 정보가 없을 때)
});
