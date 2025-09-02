import { Link } from "react-router-dom";
import './Header.css';
import useNavi from "../hooks/useNavi";

function Header() {
  const { goHome, goTo } = useNavi();

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
              <a
                className="navbar-button"
                onClick={() => {
                  goTo('/login');
                }}
              >
                로그인
              </a>
              <a
                className="navbar-button"
                onClick={() => {
                  goTo('/signup');
                }}
              >
                회원가입
              </a>
            </div>
          </div>
          <div className="navbar-icons">
            <h4
              onClick={() => {
                goTo('/survey');
              }}
              className="text1"
            >
              💖성향분석 테스트
            </h4>

            <h4
              onClick={() => {
                goTo('/main2');
              }}
              className="text1"
            >
              ⭐맞춤형 게임 추천
            </h4>

            <h4
              onClick={() => {
                goTo('/main3');
              }}
              className="text1"
            >
              💬결과 공유하기
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;