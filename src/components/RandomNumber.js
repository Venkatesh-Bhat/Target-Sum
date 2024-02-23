import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function RandomNumber({ value, isDisabled, onPress, id }) {
  const handleClick = () => {
    if (!isDisabled) {
      onPress(id);
    }
  };
  return (
    <TouchableOpacity onPress={handleClick}>
      <Text style={[styles.randomNum, isDisabled && styles.numSelected]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  randomNum: {
    textAlign: "center",
    backgroundColor: "#f8d245",
    fontSize: 40,
    paddingVertical: 10,
    width: 100,
    marginHorizontal: 15,
    marginVertical: 40,
  },
  numSelected: {
    opacity: 0.3,
  },
});
