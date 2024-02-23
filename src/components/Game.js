import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import shuffle from "lodash.shuffle"; //Required to shuffle the array elements
import RandomNumber from "./RandomNumber";

// import { Ionicons } from "@expo/vector-icons";
export default function Game({
  randomNumberCount,
  initialSeconds,
  playAgain,
  checkScore,
  score,
}) {
  //   const [gameStatus, setGameStatus] = React.useState("PLAYING");
  //   const [idSelected, setidSelected] = React.useState([]);

  //   const [randomNumArray] = React.useState(
  //     Array.from({ length: randomNumberCount }).map(
  //       () => 1 + Math.floor(Math.random() * 10)
  //     )
  //   );

  const [remTime, setRemTime] = React.useState(initialSeconds);

  const [gameObj, setGameObj] = React.useState({
    status: "PLAYING",
    idSelected: [],
    randomNumArray: Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(Math.random() * 10)
    ),
  });
  const target = gameObj.randomNumArray
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  //   const target = randomNumArray
  //     .slice(0, randomNumberCount - 2)
  //     .reduce((acc, curr) => acc + curr, 0);

  const [shuffledRandArray, setShuffledRandArray] = React.useState([]);

  React.useEffect(() => {
    setShuffledRandArray(shuffle(gameObj.randomNumArray));
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSelected = (index) => {
    return gameObj.idSelected.includes(index);
  };
  //   const handleSelected = (index) => {
  //     return idSelected.includes(index);
  //   };

  //   React.useEffect(() => {
  //     const updatedGameStatus = checkGameStatus(idSelected);
  //     setGameStatus(updatedGameStatus);
  //   }, [idSelected]);

  const clickHandler = (index) => {
    setGameObj((prevState) => ({
      ...prevState,
      idSelected: [...prevState.idSelected, index],
      // status: checkGameStatus([...prevState.idSelected, index]),
    }));
    // console.log(gameObj.idSelected);
  };
  React.useEffect(() => {
    const status = checkGameStatus(gameObj.idSelected);
    setGameObj((prevState) => ({
      ...prevState,
      status: status,
    }));
  }, [gameObj.idSelected]);
  //   const clickHandler = (index) => {
  //     setidSelected((idSelected) => [...idSelected, index]);
  //     console.log(idSelected);
  //   };

  const checkGameStatus = (updatedIDSelected) => {
    const sumSelected = updatedIDSelected.reduce(
      (acc, cur) => acc + shuffledRandArray[cur],
      //   (acc, cur) => acc + gameObj.randomNumArray[cur],
      //   (acc, cur) => acc + randomNumArray[cur],
      0
    );
    console.log(sumSelected);
    if (sumSelected < target) return "PLAYING";
    if (sumSelected === target) {
      checkScore("WON");
      return "WON";
    }
    if (sumSelected > target) {
      checkScore("LOST");
      return "LOST";
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setRemTime((remTime) => {
        if (remTime === 0) {
          clearInterval(timer);
          setGameObj((prevState) => {
            if (prevState.status === "PLAYING")
              return { ...prevState, status: "LOST" };
            else {
              return prevState;
            }
          });
          return 0;
        } else {
          if (gameObj.status !== "PLAYING") {
            console.log(gameObj.status);
            clearInterval(timer);
            return remTime;
          }
          return remTime - 1;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameObj.status, remTime]);

  //   React.useEffect(() => {
  //     if (remTime === 0) {
  //         clearInterval(timer);
  //       setGameObj((prevState) => ({ ...prevState, status: "LOST" }));
  //     }
  //   }, [remTime]);

  return (
    <View style={styles.container}>
      <Text style={[styles.targetField, styles[`STATUS_${gameObj.status}`]]}>
        {/* <Text style={[styles.targetField, styles[`STATUS_${gameStatus}`]]}> */}
        {target}
      </Text>
      <View style={styles.randNumContainer}>
        {shuffledRandArray.map((number, index) => (
          // {gameObj.randomNumArray.map((number, index) => (
          <RandomNumber
            key={index}
            id={index}
            value={number}
            isDisabled={handleSelected(index) || gameObj.status !== "PLAYING"}
            // isDisabled={handleSelected(index) || gameStatus !== "PLAYING"}
            onPress={clickHandler}
          />
        ))}
      </View>
      <Text style={styles.score}>Score: {score}</Text>
      {/* <Text style={styles.status}>Game Status: {gameObj.status}</Text> */}
      {/* <Text style={styles.status}>Game Status: {gameStatus}</Text> */}
      <Text style={styles.status}>Time Remaining: {remTime}</Text>
      {gameObj.status !== "PLAYING" && (
        <Button
          title="Play Again"
          onPress={playAgain}
          // icon={<Ionicons name="md-refresh" size={24} color="white" />}
        />
      )}
      {/* <Ionicons name="restart" size={40} color="green" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#666",
    flexDirection: "column",
  },
  targetField: {
    marginTop: StatusBar.currentHeight + 10,
    textAlign: "center",
    fontSize: 60,
    paddingVertical: 10,
    marginHorizontal: 40,
  },
  randNumContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  status: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    marginBottom: 10,
  },
  STATUS_PLAYING: {
    backgroundColor: "lightblue",
  },
  STATUS_WON: {
    backgroundColor: "limegreen",
  },
  STATUS_LOST: {
    backgroundColor: "crimson",
  },
  score: {
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    top: StatusBar.currentHeight + 15,
  },
});
