import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './RecommendGameList.css'
import useNavi from "../hooks/useNavi";
import { Link } from "react-router-dom";

const RecommendGameList = ({userInfo}) =>{
  const { goTo } = useNavi();
  const [gameList, setGameList] = useState([]);
  //   useEffect(()=>{
  //    axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/surveyresult`)
  //     .then(response =>{
  //       console.log(response.data)
  //      }).catch(error =>{
  //       console.error(error);
  //     })
  // },[])
  
  useEffect(()=>{
    if (!userInfo?.id) return;

    axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/recommendgame/${userInfo.id}`)
    .then(response =>{
      console.log(response.data)
      setGameList(response.data)
    }).catch(error=>{
      console.error(error);
    })
  },[userInfo])
    
  return(
    <>
    <h1>추천 게임</h1>
    <div className="recommendGameList-container">
      {gameList.length > 0 ? (
        gameList.map((game, i) => (
          <div key={i} className="game-card">
            <div className="gameimg">
              <img onClick={()=>{
                window.open(`https://store.steampowered.com/app/${game.steam_appid}`, "_blank");
              }} src={game.header_image} alt={game.name} />
            </div>
            <div className="gameinfo">
              <h3>{game.name}</h3>
              {game.genres?.length > 0 && (
                <p>{game.genres.map((g) => g.description).join(", ")}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>추천 게임이 없습니다.</p>
      )}
    </div>
    </>
  )
}

export default RecommendGameList;