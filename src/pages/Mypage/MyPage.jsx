import { useEffect, useState } from "react";
import "./MyPage.css";
import TabContents from "../../components/TabContents";
import useNavi from "../../hooks/useNavi";
import axiosInstance from "../../axiosInstance";
import ResultSharePanel from "../Survey/ResultSharePanel";
import resultImages from "../Survey/resultImages";
import SHARE_DESC_MAP from "../Survey/SHARE_DESC_MAP";

function MyPage({userInfo}) {

  const [tabNumber ,setTabNumber] = useState(0);
  const { goTo } = useNavi();
  const[genre, setGenre] = useState("");
  const [result, setResult] = useState(null);
  const [resultState, setResultState] = useState({title : "", desc : ""});
  
    useEffect(()=>{
     axiosInstance.get(`${import.meta.env.VITE_SERVER_URL}/surveyresult`)
      .then(response =>{
        console.log(response.data[0])
        console.log(response.data)
        const data = response.data[0];

        setResult(response.data[0]);
        setGenre(response.data[0].combinationGenre)

        setResultState({
          title : data.combinationGenre || "",
          desc : SHARE_DESC_MAP[data.combinationGenre] || "",
        })
       }).catch(error =>{
        console.error(error);
      })
  },[])

  return (
    <>
      <div className="mypage-container">
        <div className="left-menu">
          <div className="tabs" onClick={()=>{
            setTabNumber(0);
          }}>나의 선호 장르</div>
          <div className="tabs" onClick={()=>{
            setTabNumber(1);
          }}>찜 목록</div>
          <div className="tabs" onClick={()=>{
            goTo('/usermodify')
          }}>회원 정보 수정/탈퇴</div>
        </div>
        <div className="right-menu">
          <div className="profile">
            <h2>{genre} {userInfo?.nickname}님 환영합니다.</h2>
          </div>
            <div className="tab-contents">
              <TabContents tabNumber={tabNumber}/>
            </div>
            <div>
              {result? (
               <ResultSharePanel
                title={resultState.title}
                description={resultState.desc}
                imageUrl={resultImages[resultState.title]}
                startUrl={window.location.origin + "/"}
                resultImages={resultImages}
                  /> 
                ) : (
                  <p>결과를 불러오는 중입니다.</p>
                )}

            </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;