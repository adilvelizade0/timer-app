import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { WINDOW_WIDTH } from "../../helpers/window";
import { Radio } from "@ui-kitten/components";
import PlaySvgComponent from "../../svg/play.component";
import { Audio } from "expo-av";

export const FocusList = ({
  navigation,
  title,
  date,
  focus,
  setSelectItem,
  focusSubject,
  setFocusSubject,
  setIsDeleteItem,
}) => {
  const [checked, setChecked] = useState(focus.check);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sound/check.mp3"),
    );
    await sound.playAsync();
  }

  const onChecked = (nextChecked) => {
    setChecked(nextChecked);
    focus.check = nextChecked;
    playSound();
    if (focusSubject.some((subj) => subj.check === true)) {
      setIsDeleteItem(true);
    } else {
      setIsDeleteItem(false);
    }
  };

  return (
    <View style={styles.focusList}>
      <View style={{ flexDirection: "row" }}>
        <Radio
          checked={checked}
          status="warning"
          onChange={(nextChecked) => {
            onChecked(nextChecked);
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              paddingLeft: 12,
              textDecorationLine: checked ? "line-through" : "none",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "#FFA209",
              fontSize: 10,
              paddingLeft: 13,
              paddingTop: 3,
              textDecorationLine: checked ? "line-through" : "none",
            }}
          >
            {date}
          </Text>
        </View>
      </View>
      <Pressable
        style={{ width: 30 }}
        onPress={() => {
          navigation.navigate("Timer");
          setSelectItem(title);
        }}
      >
        <PlaySvgComponent />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  focusList: {
    flex: 1,
    alignItems: "center",
    height: 65,
    width: WINDOW_WIDTH / 1.1,
    borderColor: "#444",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
  },
});
