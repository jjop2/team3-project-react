import { useEffect } from "react";
import useNavi from "./useNavi";

const useAuthCheck = (userInfo, isLoading) => {
  const {goTo} = useNavi();

  useEffect(() => {
    if(!isLoading && !userInfo) {
      alert('로그인이 필요합니다');
      goTo('/login');
    }
  }, [userInfo,isLoading, goTo]);
  
  return !isLoading && !userInfo;
}

export default useAuthCheck;