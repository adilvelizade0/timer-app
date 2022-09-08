import React, { useState } from "react";
import { Vibration, View, StyleSheet } from "react-native";
import Button from "../../components/Button.component";
import CancelButton from "../../components/CancelButton.component";
import { Audio } from "expo-av";

import { Countdown } from "../../components/Countdown/Countdown.component";
import PassedButton from "../../components/PassedButton.component";

export const Timer = ({
  isTimerPlaying,
  setIsTimerPlaying,
  setIsCloseTimer,
  selectItem,
}) => {
  const [alarm, setAlarm] = useState(false);
  const [second, setSecond] = useState(30);
  const [keyTimer, setKeyTimer] = useState(0);
  const [passed, setPassed] = useState(0);
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../sound/multimedia_button_click.mp3")
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

  const vibrate = () => {
    const interval = setInterval(() => Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(interval), 5000);
    setAlarm(true);
  };

  const onEnd = () => {
    vibrate();

    setTimeout(() => {
      setIsTimerPlaying(false);
      setAlarm(false);
    }, 5100);
  };

  const onClose = () => {
    setIsCloseTimer(true);
    setSecond(30);
    setPassed(0);
    setKeyTimer(0);
    setIsTimerPlaying(false);
  };

  const onPassed = (count) => {
    setPassed((prev) => prev + count);

    setKeyTimer((prev) => prev + 1);
  };

  return (
    <>
      {isTimerPlaying ? (
        <View style={styles.countdownWrapper}>
          <Countdown
            keyTimer={keyTimer}
            second={second}
            isTimerPlaying={true}
            onEnd={onEnd}
            passed={passed}
            selectItem={selectItem}
          />
        </View>
      ) : (
        <View style={styles.countdownWrapper}>
          <Countdown
            keyTimer={keyTimer}
            second={second}
            onEnd={onEnd}
            passed={passed}
            selectItem={selectItem}
          />
        </View>
      )}

      <View style={styles.buttonWrapper}>
        <Button
          isTimerPlaying={isTimerPlaying}
          setIsTimerPlaying={setIsTimerPlaying}
          alarm={alarm}
          playSound={playSound}
        />
        <CancelButton
          setKeyTimer={setKeyTimer}
          setSecond={setSecond}
          playSound={playSound}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 100,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <PassedButton
            title="+10s"
            count={10}
            setPassed={onPassed}
            playSound={playSound}
          />
          <PassedButton
            title="+20s"
            count={20}
            setPassed={onPassed}
            playSound={playSound}
          />
          <PassedButton
            title="+30s"
            count={30}
            setPassed={onPassed}
            playSound={playSound}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 0.9,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  countdownWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    padding: 12,
  },
});
