import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PassedButton({ title, setPassed, count, playSound }) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        playSound();
        setPassed(count);
      }}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2C2C2E",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    margin: 15,
  },
});
