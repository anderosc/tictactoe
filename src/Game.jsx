import { useContext, useState, useEffect } from "react";
import { GameContext } from "./context/GameContext";

function Game() {
  const {
    players,
    lastWinner,
    setLastWinner,
    updatePlayerStats
  } = useContext(GameContext);

  const initialBoard = [];
  for (let i = 0; i < 9; i++) {
    initialBoard.push({
      id: i,
      red: false,
      blue: false,
      className: "",
    });
  }

  const [board, setBoard] = useState(initialBoard);
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [doRedStartsGame, setDoRedStartsGame] = useState(true);
  const [winner, setWinner] = useState(null);


  const [scoreRed, setScoreRed] = useState(0);
  const [scoreBlue, setScoreBlue] = useState(0);
  const [draws, setDraws] = useState(0);

  useEffect(() => {
    if (lastWinner === players.player1) {
      setIsRedTurn(true);
    } else if (lastWinner === players.player2) {
      setIsRedTurn(false);
    }
  }, [lastWinner, players]);

  const handleClick = (id) => {
    if (winner) return;

    const newBoard = [...board];
    const cell = newBoard[id];

    if (!cell.red && !cell.blue) {
      if (isRedTurn) {
        cell.red = true;
        cell.className = "red";
      } else {
        cell.blue = true;
        cell.className = "blue";
      }

      setIsRedTurn(!isRedTurn);
      setBoard(newBoard);
      checkWinner(newBoard);
    }
  };

  const checkWinner = () => {
    const combination1 = [0, 1, 2];
    const combination2 = [3, 4, 5];
    const combination3 = [6, 7, 8];
    const combination4 = [0, 3, 6];
    const combination5 = [1, 4, 7];
    const combination6 = [2, 5, 8];
    const combination7 = [0, 4, 8];
    const combination8 = [2, 4, 6];

    const allCombinations = [
      combination1,
      combination2,
      combination3,
      combination4,
      combination5,
      combination6,
      combination7,
      combination8,
    ];

    for (let i = 0; i < allCombinations.length; i++) {
      const combination = allCombinations[i];
      const a = combination[0];
      const b = combination[1];
      const c = combination[2];

      if (board[a].red === true && board[b].red === true && board[c].red === true) {
        setWinner(players.player1);
        setScoreRed(scoreRed + 1);
        setLastWinner(players.player1); 
        return;
      }

      if (board[a].blue === true && board[b].blue === true && board[c].blue === true) {
        setWinner(players.player2);
        setScoreBlue(scoreBlue + 1);
        setLastWinner(players.player2); 
        return;
      }
    }

    if (board.every((cell) => cell.red || cell.blue)) {
      setWinner("Draw");
      setDraws(draws + 1);
      setLastWinner("draw"); 
    }
  };

  const resetGame = () => {
    updatePlayerStats(players.player1, players.player2, scoreRed, scoreBlue, lastWinner);

    setBoard(initialBoard);
    setDoRedStartsGame(!doRedStartsGame); 
    setIsRedTurn(doRedStartsGame);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>

      <h2>
  <span className="x_player">{players.player1} (X)</span> vs{" "}
  <span className="o_player">{players.player2} (O)</span>
</h2>


      <div className="scoreboard">
        <p>{players.player1} Wins: {scoreRed}</p>
        <p>{players.player2} Wins: {scoreBlue}</p>
        <p>Draws: {draws}</p>
      </div>

      {winner && <h2>Winner: {winner}</h2>}

      <div className="board">
        {board.map((cell) => {
          let className = "cell";
          if (cell.red) className += " red";
          if (cell.blue) className += " blue";

          return (
            <button
              key={cell.id}
              className={className}
              onClick={() => handleClick(cell.id)}
              disabled={cell.red || cell.blue}
            >
              {cell.red ? "X" : cell.blue ? "O" : ""}
            </button>
          );
        })}
      </div>

      <button className="reset" onClick={resetGame}>
        Restart
      </button>
    </div>
  );
}

export default Game;