import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({
  isTimerPlaying,
  setIsTimerPlaying,
  alarm,
  playSound,
}) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        if (!alarm) {
          playSound();
          setIsTimerPlaying((prev) => !prev);
        }
      }}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
        {isTimerPlaying ? "Pause" : "Start"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2C2C2E",
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 15,
    margin: 10,
  },
});
