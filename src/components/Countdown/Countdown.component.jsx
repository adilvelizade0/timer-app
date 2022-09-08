import React, { useEffect, useState } from "react";
import { Animated, Platform, Text } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { WINDOW_HEIGHT } from "../../helpers/window";
import { Audio } from "expo-av";

export const Countdown = ({
  onEnd,
  isTimerPlaying,
  second,
  keyTimer,
  passed,
  selectItem,
}) => {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sound/alarm.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const renderTimer = (second, passed) => {
    if (second + passed > 90) {
      return 90;
    }
    return second + passed;
  };

  const renderTime = (dimension, time) => {
    return (
      <>
        <Animated.Text
          style={{
            color: second + passed >= 90 ? "red" : "#fff",
            fontSize: 90,
            fontWeight: "bold",
          }}
        >
          {time}
        </Animated.Text>
        <Text style={{ fontSize: 20, color: "#fff", fontWeight: "200" }}>
          {dimension}
        </Text>
      </>
    );
  };

  return (
    <>
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 40,
        }}
      >
        {selectItem} : {second}
      </Text>
      <CountdownCircleTimer
        key={keyTimer}
        size={Platform.OS === "ios" ? WINDOW_HEIGHT / 3.5 : WINDOW_HEIGHT / 3}
        isPlaying={isTimerPlaying}
        strokeWidth={5}
        duration={renderTimer(second, passed)}
        onComplete={() => {
          onEnd();
          playSound();
          return [true, 5000];
        }}
        colors={[["#FFA209", 1]]}
        trailColor={"#111"}
      >
        {({ remainingTime }) => renderTime("Seconds", remainingTime)}
      </CountdownCircleTimer>
    </>
  );
};
