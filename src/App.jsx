
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [topTwoGenres , setTopTwoGenres] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      setAuth(true);
    } else {
      setAuth(false);
      setUserInfo(null);
    }
  }, []);

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
        })
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
          <Route path="/signup" element={<Signup setAuth={setAuth} userInfo={userInfo} />} />
          <Route
            path="/usermodify"
            element={
              <ProtectedRoute auth={auth}>
                <UserModify userInfo={userInfo} setAuth={setAuth} setUserInfo={setUserInfo} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey"
            element={
              <ProtectedRoute auth={auth}>
                <Survey setTopTwoGenres={setTopTwoGenres} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/surveyresult"
            element={
              <ProtectedRoute auth={auth}>
                <SurveyResult topTwoGenres={topTwoGenres} />
              </ProtectedRoute>
            }
          />
          {/* /main2, /main3은 실제 컴포넌트로 교체 필요 */}
          <Route
            path="/main2"
            element={
              <ProtectedRoute auth={auth}>
                <div>Main2 Page</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/main3"
            element={
              <ProtectedRoute auth={auth}>
                <div>Main3 Page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
