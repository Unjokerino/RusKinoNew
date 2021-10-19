import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import WebView from "react-native-webview";
import { MOVIE_DETAILED, WEB_VIEW_SCREEN } from "../constants";
import { BottomTabParamList } from "../types";

type BottomTabParamListProp = StackScreenProps<
  BottomTabParamList,
  typeof WEB_VIEW_SCREEN
>;

export default function WebViewScreen({
  navigation,
  route: { params },
}: BottomTabParamListProp) {
  useEffect(() => {
    navigation.setOptions({
      title: params.name,
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <WebView
        style={{ flex: 1, marginTop: -50, marginBottom: 90 }}
        source={{ uri: params.url }}
      />
    </View>
  );
}
