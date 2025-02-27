import { useState, createContext } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [players, setPlayers] = useState({
    player1: "",
    player2: "",
  });

  const [scores, setScores] = useState({
    player1Wins: 0,
    player2Wins: 0,
    draws: 0,
  });

  const [lastWinner, setLastWinner] = useState(null); 
  const [playerStats, setPlayerStats] = useState([]); 

  const updatePlayers = (name1, name2) => {
    setPlayers({ player1: name1, player2: name2 });
  };
  
  const updateScores = (winner) => {
    setScores((prevScores) => {
      if (winner === "Red") {
        return { ...prevScores, player1Wins: prevScores.player1Wins + 1 };
      } else if (winner === "Blue") {
        return { ...prevScores, player2Wins: prevScores.player2Wins + 1 };
      } else if (winner === "Draw") {
        return { ...prevScores, draws: prevScores.draws + 1 };
      }
      return prevScores;
    });
  };

  const updatePlayerStats = (player1, player2, player1Score, player2Score, lastWinner) => {
    setPlayerStats((prevStats) => [
      ...prevStats,
      {
        player1: player1,
        player2: player2,
        winner : lastWinner,
        player1Score: player1Score,
        player2Score: player2Score,
        date: new Date().toLocaleString(),
      },
      
    ]);
    console.log(playerStats)
  };

  return (
    <GameContext.Provider
      value={{
        players,
        scores,
        lastWinner,
        playerStats,
        updatePlayers,
        updateScores,
        setLastWinner,
        updatePlayerStats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};