import { Link } from 'react-router-dom'
import {  Routes, Route } from "react-router-dom";

import './App.css'
import Game from './Game';

function App() {


  return (
    <>
    <div className='navbar'> 
    <button className='navbarbutton'> Game </button>
    <button className='navbarbutton'>Stats</button> 
    </div>
    <Routes>
      <Route path='/game' element={<Game />} />
    </Routes>
      <Link></Link>
    </>
  )
}

export default App
