import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const TabContents = ({tabNumber}) => {

  const[genre, setGenre] = useState("");
  const[likeGame, setLikeGame] = useState("");

  useEffect(()=>{
     axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/surveyresult`)
      .then(response =>{
        setGenre(response.data[0].combinationGenre)
       }).catch(error =>{
        console.error(error);
      })
  },[])

  return(
    <>
 {[
        <div key="genre">
          <h2>나의 선호 장르</h2> <br />
          <h3>{genre}</h3>
          <p>
            {genre ? (
              <img src={`../src/images/${genre}.PNG`} alt={genre} style={{width:"100%", margin:"auto"}}/>
            ) : (
              "아직 결과가 없습니다. 성향테스트를 진행해주세요."
            )}
          </p>
        </div>,
        <div>
          <h2>나의 찜 목록</h2>
          <p>
           {likeGame ? (
              "찜하기"
            ) : (
              "찜 목록이 없습니다."
            )}
          </p>
        </div>
      ][tabNumber]
    }
    </>
  )
}

export default TabContents;