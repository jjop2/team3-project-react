
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
import MyPage from './pages/Mypage/Mypage';

function App() {
  return (
    <>
      
      <header>
        <Header />
      </header>

      <main className="container-app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="survey" element={<Survey />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
