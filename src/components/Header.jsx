import {Link} from "react-router-dom";
import "./Header.css";
import useNavi from "../hooks/useNavi";
import useAuthCheck from "../hooks/useAuthCheck";
import {useEffect, useState} from "react";

function Header({auth, setAuth, userInfo, setUserInfo, isLoading}) {
  const {goHome, goTo} = useNavi();
  const [genreOpen, setGenreOpen] = useState(false);
  const genres = [
    {id: 1, name: "액션", add: "action"},
    {id: 2, name: "시뮬레이션", add: "simulation"},
    {id: 3, name: "레이싱", add: "racing"},
    {id: 4, name: "스포츠", add: "sports"},
    {id: 5, name: "RPG", add: "rpg"},
  ];

  const logout = () => {
    sessionStorage.clear("jwt");
    setAuth(false);
    setUserInfo(null); // false -> null로바꿈
    alert("로그아웃 되었습니다");
    goHome();
  };

  return (
    <>
      <div id="wrap">
        <div className="allnavbar">
          <div className="navbar">
            <div className="navbar-left">
              <div className="logo">
                <Link to="/"></Link>
              </div>
              <div className="content">
                <Link className="navbar-title" to="/">
                  <h1>GAMBTI</h1>
                  <p>내게 맞는 게임장르 찾기</p>
                </Link>
              </div>
            </div>

            <div className="navbar-right">
              {auth ? (
                <a
                  className="navbar-button navbar-username"
                  onClick={() => {
                    goTo("/mypage");
                  }}
                >
                  🙍‍♀️{userInfo.nickname}
                </a>
              ) : (
                <a
                  className="navbar-button"
                  onClick={() => {
                    goTo("/login");
                  }}
                >
                  로그인
                </a>
              )}

              {auth ? (
                <a className="navbar-button" onClick={logout}>
                  로그아웃
                </a>
              ) : (
                <a
                  className="navbar-button"
                  onClick={() => {
                    goTo("/signup");
                  }}
                >
                  회원가입
                </a>
              )}
            </div>
          </div>

          <div className="navbar-icons">
            <h4
              onClick={() => {
                goTo("/survey");
              }}
              className="text1"
            >
              💖성향분석 테스트
            </h4>

            <h4
              onClick={() => {
                goTo(`/recommendgame`);
              }}
              className="text1"
            >
              ⭐맞춤형 게임 추천
            </h4>

            <div
              className="dropdown-wrapper"
              onMouseEnter={() => setGenreOpen(true)}
              onMouseLeave={() => setGenreOpen(false)}
            >
              <h4 className="text1">📄장르별 게임 추천</h4>
              {genreOpen && (
                <ul className="dropdown"onMouseEnter={() => setGenreOpen(true)}
              onMouseLeave={() => setGenreOpen(false)}>
                  {genres.map((g, i) => (
                    <li key={i} onClick={() => goTo(`/recommendgame/${g.add}`)}>
                      {g.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h4
              onClick={() => {
                goTo("/board");
              }}
              className="text1"
            >
              💬자유 게시판
            </h4>
          </div>
        </div>

        <div className="navbar-right">
          {auth ? (
            <a
              className="navbar-button navbar-username"
              onClick={() => {
                goTo("/mypage");
              }}
            >
              🙍‍♀️{userInfo.nickname}
            </a>
          ) : (
            <a
              className="navbar-button"
              onClick={() => {
                goTo("/login");
              }}
            >
              로그인
            </a>
          )}

          {auth ? (
            <a className="navbar-button" onClick={logout}>
              로그아웃
            </a>
          ) : (
            <a
              className="navbar-button"
              onClick={() => {
                goTo("/signup");
              }}
            >
              회원가입
            </a>
          )}
        </div>
      </div>
      <div className="navbar-icons">
        <h4
          onClick={() => {
            goTo("/survey");
          }}
          className="text1"
        >
          💖성향분석 테스트
        </h4>

        <h4
          onClick={() => {
            goTo(`/recommendgame`);
          }}
          className="text1"
        >
          ⭐맞춤형 게임 추천
        </h4>

        <h4
          onClick={() => {
            goTo("/board");
          }}
          className="text1"
        >
          💬결과 공유하기
        </h4>
      </div>
    </>
  );
}

export default Header;
