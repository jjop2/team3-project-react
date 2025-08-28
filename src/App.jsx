
import MainPage from './pages/MainPage';
import Login from "./pages/Login/Login"
import Signup from './pages/Signup/Signup'
import Survey from './pages/Survey'
import './App.css'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import FAQ from './pages/FAQ'
import Header from './Header'
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

function App() {
  const [auth, setAuth] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if(sessionStorage.getItem('jwt') != null)
      setAuth('true');
  }, [])

  useEffect(() => {
    if(auth) {
      axiosInstance.get('/userinfo')
        .then(response => {
          setUserInfo(response.data)
        }).catch(error => {
          console.error(error);
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
          <Route path="/signup" element={<Signup />} />
          <Route path="survey" element={<Survey />}></Route>
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
