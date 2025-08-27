
import { Route, Routes} from 'react-router-dom'
import './App.css'
import Survey from './pages/Survey'


function App() {
  return (
    <div>
      <Routes>
        <Route path='survey' element= {<Survey />}></Route>
      </Routes>
    </div>
  )
}

export default App
