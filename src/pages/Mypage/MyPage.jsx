import { useState } from "react";
import "./MyPage.css";
import TabContents from "../../components/TabContents";
import useNavi from "../../hooks/useNavi";

function MyPage({userInfo}) {

  const [tabNumber ,setTabNumber] = useState(0);
  const { goTo } = useNavi();
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
            <h2>{userInfo.nickname}님 환영합니다.</h2>
          </div>
            <div className="tab-contents">
              <TabContents tabNumber={tabNumber}/>
            </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;