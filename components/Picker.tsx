import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useColors } from "../constants/Colors";

const CITIES = [
  { label: "Ноябрьск", value: "Ноябрьск" },
  { label: "Вынгапур", value: "Вынгапур" },
];

export default function Picker() {
  const colors = useColors();
  const pickerRef = useRef<RNPickerSelect>(null);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(pickerRef.current?.togglePicker());
      }}
      style={[styles.picker, { backgroundColor: colors.cardColor }]}
    >
      <RNPickerSelect
        ref={pickerRef}
        value={CITIES[0]}
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
    width: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
