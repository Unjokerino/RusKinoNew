import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
const CITIES = [
  { label: "Ноябрьск", value: "Ноябрьск" },
  { label: "Вынгапур", value: "Вынгапур" },
];
import RNPickerSelect from "react-native-picker-select";
export default function Picker() {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.picker,
        { backgroundColor: Colors[colorScheme].cardColor },
      ]}
    >
      <RNPickerSelect
        value={CITIES[0]}
        placeholder={{}}
        onValueChange={(value) => console.log(value)}
        items={CITIES}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  picker: {
    alignSelf: "center",
    paddingHorizontal: 20,
    height: 40,
    overflow: "hidden",
    width: 123,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
