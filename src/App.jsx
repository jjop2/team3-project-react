
import MainPage from './pages/MainPage';
import Login from "./pages/Login/Login"
import Signup from './pages/Signup/Signup'
import './App.css'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import FAQ from './pages/FAQ'
import Header from './components/Header'
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import Survey from './pages/Survey/Survey';
import SurveyResult from './pages/Survey/SurveyResult';
import UserModify from './pages/Mypage/UserModify';
import Board from './pages/Board/Board';
import BoardWrite from './pages/Board/BoardWrite';

function App() {
  const [auth, setAuth] = useState();
  const [userInfo, setUserInfo] = useState();
  const [topTwoGenres , setTopTwoGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(sessionStorage.getItem('jwt') != null) {
      setAuth(true);
    } else {
      // 토큰이 없으면 로딩을 즉시 완료
      setIsLoading(false);
    }
  }, [])

  /* 
    userInfo : 현재 로그인한 유저의 정보
    id, username, nickname, email, role, oauth 들어 있음
    스프링 UserDTO 참고
  */
  useEffect(() => {
    if(auth) {
      axiosInstance.get('/userinfo')
        .then(response => {
          setUserInfo(response.data)
        }).catch(error => {
          console.error(error);
          setAuth(false);
          if(sessionStorage.getItem('jwt') != null)
            sessionStorage.removeItem('jwt');
        }).finally(() => {
          setIsLoading(false);
        })
    } else {
      setIsLoading(false);
    }
  }, [auth]);

  if(auth && !userInfo)
    return <div>로딩 중...</div>

  return (
    <>
      
      <header>
        <Header
          auth={auth}
          setAuth={setAuth}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </header>

      <main className="container-app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/usermodify" element={<UserModify userInfo={userInfo} setAuth={setAuth} setUserInfo={setUserInfo}/>}></Route>
          <Route path="/survey" element={<Survey setTopTwoGenres={setTopTwoGenres}/>}/>
          <Route path="/surveyresult" element={<SurveyResult topTwoGenres={topTwoGenres} />} />
          <Route path='/board' element={<Board />} />
          <Route path='/write' element={<BoardWrite
            userInfo={userInfo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
