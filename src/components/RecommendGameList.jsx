import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './RecommendGameList.css'
import useNavi from "../hooks/useNavi";


const RecommendGameList = ({userInfo}) =>{
  const { goTo } = useNavi();
  const [gameList, setGameList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const[genre, setGenre] = useState("");
  const handleLoadMore = () => {
  setVisibleCount(prev => prev + 3); // 3개씩 늘리기
};
  
  useEffect(()=>{
    if (!userInfo?.id) return;

    axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/recommendgame/${userInfo.id}`)
    .then(response =>{
      setGameList(response.data)
    }).catch(error=>{
      console.error(error);
    })
  },[userInfo])

    useEffect(()=>{
     axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/surveyresult`)
      .then(response =>{
        setGenre(response.data[0].combinationGenre)
       }).catch(error =>{
        console.error(error);
      })
  },[])

    
  return(
  <div>
    {gameList.length > 0 ? (
     <h1 className="recommend_title" >
        {" "}
        {genre} {userInfo.nickname}
        <br></br><span className="listsub_title"> 님을 위한 게임 추천</span>
      </h1>
     ): (
       <div></div>
      )}

    <div className="recommendGameList-container" id="member_recommend">
      {gameList.length > 0 ? (
        gameList.slice(0, visibleCount).map((game, i) => (
          <div key={i} className="game-card">
            <div className="gameimg">
              <img onClick={()=>{
                window.open(`https://store.steampowered.com/app/${game.steam_appid}`, "_blank");
              }} src={game.header_image} alt={game.name} />
            </div>
            <div className="gameinfo">
              <h3>{game.name}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>추천 게임이 없습니다.</p>
      )}
    </div>
    
    {visibleCount < gameList.length && (
      <div className="visiblebtn">
        <button className="btn" 
         onClick={handleLoadMore}>더보기</button>
     </div>
  )}
  </div>
  )
}

export default RecommendGameList;