import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Audio } from "expo-av";

export const RemoveItem = ({
  isDeleteItem,
  setFocusSubject,
  focusSubject,
  setIsDeleteItem,
}) => {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sound/trash.mp3"),
    );
    await sound.playAsync();
  }

  const deleteFocusSubject = () => {
    if (isDeleteItem) {
      const newFocusSubjects = focusSubject.filter(
        (focusObject) => focusObject.check !== true,
      );
      setFocusSubject(newFocusSubjects);
      playSound();
      setIsDeleteItem(false);
    }
  };
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => deleteFocusSubject()}
        labelStyle={{
          fontSize: 30,
          color: isDeleteItem ? "#bc7d00" : "#fff",
        }}
        icon="delete"
        style={{ backgroundColor: "#000" }}
        compact
      />
    </View>
  );
};
