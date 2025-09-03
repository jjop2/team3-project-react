import { useState } from "react";

const RPG = () =>{
    const [gameList, setGameList] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3); // 3개씩 늘리기
  };
    useEffect(()=>{
    if (!gameList) return;

    axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/recommendgame/rpg`)
    .then(response =>{
      console.log(response.data)
      setGameList(response.data)
    }).catch(error=>{
      console.error(error);
    })
  },[])

  return(
  <div>
    {gameList.length > 0 ? (
     <h1 style={{marginTop:"20px"}}>RPG 장르를 좋아하는 당신을 위한 게임 추천</h1>
     ): (
       <div></div>
      )}

    <div className="recommendGameList-container">
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

export default RPG;