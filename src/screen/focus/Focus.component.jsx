import React from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { FocusList } from "../../components/FocusList/FocusList.component";
import { Input } from "@ui-kitten/components";

import AddSvgComponent from "../../svg/add.component";
import { SafeAreaComponent } from "../../components/safe-area.component";
import { RemoveItem } from "../../components/FocusList/remove.component";

export const Focus = ({
  navigation,
  focusSubject,
  setSelectItem,
  setFocusSubject,
  isDeleteItem,
  setIsDeleteItem,
}) => {
  const [value, setValue] = React.useState("");

  const addFocusItem = () => {
    const date = new Date();
    const item = {
      title: value,
      date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} , ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      check: false,
    };

    setFocusSubject([...focusSubject, item]);
    setValue("");
  };

  return (
    <SafeAreaComponent>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <RemoveItem
          focusSubject={focusSubject}
          setFocusSubject={setFocusSubject}
          isDeleteItem={isDeleteItem}
          setIsDeleteItem={setIsDeleteItem}
        />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          width: "95%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            addFocusItem();
          }}
        >
          <AddSvgComponent />
        </TouchableOpacity>

        <View
          style={{
            paddingLeft: 10,
            flex: 1,
          }}
        >
          <Input
            placeholder="Place Your Task"
            value={value}
            size="large"
            status="warning"
            onChangeText={(nextValue) => setValue(nextValue)}
          />
        </View>
      </View>

      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          {focusSubject.map((data, index) => (
            <FocusList
              setSelectItem={setSelectItem}
              key={index}
              title={data.title}
              date={data.date}
              focus={data}
              navigation={navigation}
              focusSubject={focusSubject}
              setFocusSubject={setFocusSubject}
              setIsDeleteItem={setIsDeleteItem}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaComponent>
  );
};
