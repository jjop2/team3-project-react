import { Link } from "react-router-dom";
import './Header.css';
import useNavi from "../hooks/useNavi";
import useAuthCheck from "../hooks/useAuthCheck";
import { useEffect, useState } from "react";

function Header({auth, setAuth, userInfo, setUserInfo, isLoading}) {
  const { goHome, goTo } = useNavi();
  
  const logout = () => {
    sessionStorage.clear('jwt');
    setAuth(false);
    setUserInfo(null); // false -> null로바꿈
    alert('로그아웃 되었습니다');
    goHome();
 }


  return (
    <>
      <div id="wrap">
        <div className="allnavbar">
          <div className="navbar">
            <div className="navbar-left">
              <div className="logo">
                <Link to="/">
                  <img src="/icons8-brain.gif" alt="Brain Logo" />
                </Link>
              </div>
              <div className="content">
                <Link className="navbar-title" to="/">
                  GameHub
                </Link>
                <span className="navbar-subtitle">당신만의 완벽한 게임을 찾아보세요</span>
              </div>
            </div>

            <div className="navbar-right">
              {
                  auth
                  ? <a className="navbar-button navbar-username" onClick={()=>{
                      
                      goTo('/mypage')
                  }}>🙍‍♀️{userInfo.nickname}</a>
                  : <a className="navbar-button" onClick={()=>{
                      goTo('/login')
                  }}>로그인</a>
              }

              {
                  auth
                  ? <a className="navbar-button" onClick={logout}>로그아웃</a>
                  : <a className="navbar-button" onClick={()=>{
                      goTo('/signup')
                  }}>회원가입</a>
              }
            </div>
          </div>
          <div className="navbar-icons">
            <h4
              onClick={() => {
                goTo('/survey')
              }}
              className="text1"
            >
              💖성향분석 테스트
            </h4>

            <h4
              onClick={() => {
                goTo(`/recommendgame`)
              }}
              className="text1"
            >
              ⭐맞춤형 게임 추천
            </h4>

            <h4
              onClick={() => {
                goTo('/board');
              }}
              className="text1"
            >
              💬커뮤니티
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;