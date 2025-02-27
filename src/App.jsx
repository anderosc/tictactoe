import {  Routes, Route, useNavigate } from "react-router-dom";

import './App.css'
import Stats from './Stats';
import {  useContext, useState } from "react";
import Game from "./Game";
import { GameContext } from "./context/GameContext";

function App() {
  const { updatePlayers } = useContext(GameContext);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate()

  const startGame = () => {
    if (player1 && player2) {
      updatePlayers(player1, player2);
      navigate("/game")
    } else {
      alert("Please enter both names!");
    }
  };


  return (
    <>
     <div className='navbar'> 
    <button onClick={() => navigate("/")} className='navbarbutton'> Home </button>
    <button onClick={() => navigate("/stats")} className='navbarbutton'>Stats</button> 
    </div>
    <br /> <br /> <br />
    
     {window.location.pathname === "/" ? <div>
      <label>Player 1:</label>
      <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
      <br />
      <label>Player 2:</label>
      <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
      <br />
      <br />

      <button onClick={() => startGame()}>START</button>
    </div> : null }


    <Routes>
      <Route path='/stats' element={<Stats />} />
      <Route path='/game' element={<Game />} />
    </Routes>
      
    </>
  )
}

export default App
