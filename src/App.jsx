
import { Route, Router, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage';

function App() {

  return (
    <>
      <main className="container-app">
        <Routes>
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App
