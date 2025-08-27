import { Link, useNavigate } from "react-router-dom";
import './Header.css'



function Header(){
 const navigate = useNavigate();

    return(
        <>
        <div id="wrap">        
            <div className="allnavbar">
            <div className="navbar">
                <div className="navbar-left">
                    <div className="logo">
                        <img src="/icons8-brain.gif" alt="Brain Logo" />
                    </div>
                    <div className="content">
                        <Link className="navbar-title" to="/">
                        GameHub
                        </Link>
                        <span className="navbar-subtitle">당신만의 완벽한 게임을 찾아보세요</span>
                    </div>

                </div>

                    <div className="navbar-right">
                        <a className="navbar-button" onClick={()=>{
                            navigate('/login')
                        }}>로그인</a>

                        <a className="navbar-button" onClick={()=>{
                            navigate('/signup')
                        }}>회원가입</a>
                   </div>
 
                </div>
                 <div className="navbar-icons">
                        <h4 onClick={()=>{
                            navigate('/main1')
                        }}className="text1">💖성향분석 테스트</h4>

                        <h4 onClick={()=>{
                            navigate('/main2')
                        }}className="text1">⭐맞춤형 게임 추천</h4>

                       <h4 onClick={()=>{
                        navigate('/main3')
                       }}className="text1">💬결과 공유하기</h4>
                    </div>
            </div>
        </div>

        </>
    )
}
    
export default Header;