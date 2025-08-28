
import MainPage from './pages/MainPage';
import Login from "./pages/Login/Login"
import Signup from './pages/Signup/Signup'
import './App.css'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import FAQ from './pages/FAQ'
import Header from './Header'
import { useState } from 'react';
import Survey from './pages/Survey/Survey';
import SurveyResult from './pages/Survey/SurveyResult';


function App() {
  
  const [topTwoGenres , setTopTwoGenres] = useState([]);
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
          <Route path="/survey" element={<Survey setTopTwoGenres={setTopTwoGenres}/>}/>
          <Route path="/surveyresult" element={<SurveyResult topTwoGenres={topTwoGenres} />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
