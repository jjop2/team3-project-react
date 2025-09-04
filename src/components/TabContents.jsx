import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import MyBoards from "./MyBoards";
import "./TabContents.css";

const TabContents = ({tabNumber, userInfo}) => {

  const[genre, setGenre] = useState("");

  useEffect(()=>{
     axiosInstance.get('/surveyresult')
      .then(response =>{
        setGenre(response.data[0].combinationGenre)
       }).catch(error =>{
        console.error(error);
      })
  },[])

  return (
    <>
       {tabNumber === 0? (
          <div className="tab_contents_wrap" key="genre">
            <div className="tab_contents">
              <h2>'나의 선호 장르'</h2> <br />
              <h3>{genre}</h3>
              <p className="genre_img">
                {genre ? (
                  <img
                    src={`../src/images/${genre}.PNG`}
                    alt={genre}
                    style={{width: "100%", margin: "auto"}}
                  />
                ) : (
                  "아직 결과가 없습니다. 성향테스트를 진행해주세요."
                )}
              </p>
            </div>
          </div>
       ) : (
          <div className="tab_contents">
            <h2>내가 쓴 글</h2>
            <MyBoards userInfo={userInfo} />
          </div>
       )}
        
    </>
  );
}

export default TabContents;