import { useNavigate } from "react-router-dom"

const useNavi = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const goTo = (path) => {
    navigate(path);
  }

  return { goHome, goTo };
}

export default useNavi;