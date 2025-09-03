import { useEffect } from "react";
import useNavi from "./useNavi";

const useAuthCheck = ({ userInfo, isLoading }) => {
  const {goTo} = useNavi();

  // useEffect(() => {
    
    
  // }, [userInfo,isLoading, goTo]);
  return !isLoading && !userInfo;
}

export default useAuthCheck;