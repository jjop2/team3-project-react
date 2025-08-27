import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from "./login"

import Header from './Header'
import Signup from './Signup'



function App() {

  return (
    <>

      <Header />
      <Routes>

        <Route path='/login' element={<Login /> } />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </>
  )
}

export default App
