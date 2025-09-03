import RecommendGameList from "../../components/RecommendGameList";

const RecommendGame = ({userInfo, topTwoGenres}) =>{

  return(
    <div>
      <RecommendGameList userInfo={userInfo} topTwoGenres={topTwoGenres}/>
    </div>
  )
}

export default RecommendGame;