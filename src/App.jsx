import Survey from './pages/Survey'
import './App.css'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import TermsOfService from './pages/Legal/TermsOfService'
import FAQ from './pages/FAQ'
import Header from './Header'

function App() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className='container-app'>
        <Routes>
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/term' element={<TermsOfService />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='survey' element= {<Survey />}></Route>
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>

    </>
  )
}

export default App
