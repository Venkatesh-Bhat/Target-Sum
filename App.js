import Game from "./src/components/Game";
import React from "react";

export default function App() {
  const [gameId, resetGame] = React.useState(1);

  // Math.floor(Math.random() * (max - min + 1)) + min;
  const [genRandNumCount, setRandNumCount] = React.useState(
    Math.floor(5 * Math.random()) + 4
  );
  const [playTime, setPlayTime] = React.useState(10);

  React.useEffect(() => {
    if (genRandNumCount > 6) setPlayTime(20);
    else setPlayTime(10);
  }, [genRandNumCount]);

  const onPlayAgain = () =>
    resetGame((setGame) => {
      setRandNumCount(Math.floor(5 * Math.random()) + 4);
      return setGame + 1;
    });

  const [score, setScore] = React.useState(0);
  const evalScore = (status) => {
    if (status === "WON") {
      setScore((s) => s + 1);
    } else if (status === "LOST") {
      setScore((s) => s - 1);
    }
  };

  return (
    <Game
      key={gameId}
      playAgain={onPlayAgain}
      score={score}
      checkScore={evalScore}
      randomNumberCount={genRandNumCount}
      initialSeconds={playTime}
    />
  );
}
