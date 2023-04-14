import React from 'react'
import {BrowserRouter, Routes, Route  } from 'react-router-dom'

import HomePage from './pages/Homepage'

import Nav from './components/Header'

import '../src/styles/App.scss'




function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Nav/>
      </header>
      
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          
        </Routes>
        
   
    </BrowserRouter>
  );
}

export default App;
