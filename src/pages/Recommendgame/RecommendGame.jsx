import RecommendGameList from "../../components/RecommendGameList";

const RecommendGame = ({userInfo}) =>{

  return(
    <div>
      <RecommendGameList userInfo={userInfo}/>
    </div>
  )
}

export default RecommendGame;