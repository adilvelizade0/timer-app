import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Timer } from "./src/screen/timer/Timer";
import { Focus } from "./src/screen/focus/Focus.component";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { data } from "./src/data/data";

const Stack = createStackNavigator();

export default function App() {
  const [focusSubject, setFocusSubject] = useState(data);
  const [isCloseTimer, setIsCloseTimer] = useState(false);
  const [selectItem, setSelectItem] = useState("");
  const [isDeleteItem, setIsDeleteItem] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@focus_subject", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@focus_subject");
      if (jsonValue !== null) {
        setFocusSubject(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData(focusSubject);
  }, [focusSubject]);

  const TimerScreen = ({ navigation }) => {
    const [isTimerPlaying, setIsTimerPlaying] = useState(false);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <Timer
          selectItem={selectItem}
          navigation={navigation}
          setIsCloseTimer={setIsCloseTimer}
          isTimerPlaying={isTimerPlaying}
          setIsTimerPlaying={setIsTimerPlaying}
        />
      </View>
    );
  };

  const FocusScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Focus
          setSelectItem={setSelectItem}
          navigation={navigation}
          focusSubject={focusSubject}
          setFocusSubject={setFocusSubject}
          isDeleteItem={isDeleteItem}
          setIsDeleteItem={setIsDeleteItem}
        />
      </View>
    );
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            ...TransitionPresets.ScaleFromCenterAndroid,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Timer" component={TimerScreen} />
          <Stack.Screen name="Home" component={FocusScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
});
