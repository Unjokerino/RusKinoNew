import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { BackgroundTriangle } from "../assets/icons/BackgroundTriangle";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  return (
    <View>
      <View style={StyleSheet.absoluteFill}>
        <BackgroundTriangle color={Colors[colorScheme].tabBarBackground} />
      </View>
    </View>
  );
}
