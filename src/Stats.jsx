import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import "./stats.css"

function Stats() {
  const { playerStats } = useContext(GameContext);

  return (
    <div className="stats">
      <h1>Game Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>

            <th>Player 1</th>
            <th>Score</th>
            <th>Player 2</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.date}</td>
              <td>{stat.winner === "Draw" ? "Draw" : `${stat.winner}`}</td>
              <td>{stat.player1}</td>
              <td>{stat.player1Score} points</td>
              <td>{stat.player2}</td>
              <td>{stat.player2Score} points</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
