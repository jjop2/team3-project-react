import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const TabContents = ({tabNumber}) => {

  const[genre, setGenre] = useState("");


  useEffect(()=>{
     axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/surveyresult`)
      .then(response =>{
        console.log(response.data)
        setGenre(response.data.combinationGenre)
       }).catch(error =>{
        console.error(error);
      })
  },[])


  return(
    <>
    {
      [
        <div>
          <h2>나의 선호 장르</h2>
          <p>
           <img src={`/images/${genre}.PNG`} alt={genre} style={{width:"400px", height:"100%"}}/>
          </p>
        </div>,
        <div>
          <h2>나의 찜 목록</h2>
        </div>
      ][tabNumber]
    }
    </>
  )
}

export default TabContents;