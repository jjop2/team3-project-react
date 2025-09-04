import RecommendGameList from "../../components/RecommendGameList";
import useAuthCheck from "../../hooks/useAuthCheck";

const RecommendGame = ({userInfo, topTwoGenres, isLoading}) =>{
  useAuthCheck(userInfo, isLoading);

  return(
    <div>
      <RecommendGameList userInfo={userInfo} topTwoGenres={topTwoGenres}/>
    </div>
  )
}

export default RecommendGame;