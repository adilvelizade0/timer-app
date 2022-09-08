import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function CancelButton({ setKeyTimer, playSound }) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        playSound();
        setKeyTimer((prev) => prev + 1);
      }}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
        Return
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2C2C2E",
    padding: 15,
    paddingLeft: 45,
    paddingRight: 45,
    borderRadius: 15,
    margin: 10,
  },
});
