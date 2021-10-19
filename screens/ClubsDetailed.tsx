import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, ScrollView, Linking } from "react-native";
import { Image } from "../components/Image";
import { CLUBS_DETAILED, THEATRE_DETAILED } from "../constants";
import { useColors } from "../constants/Colors";
import { BottomTabParamList } from "../types";
import { Text } from "../components/Themed";

type ClubsDetailedProps = StackScreenProps<
  BottomTabParamList,
  typeof CLUBS_DETAILED
>;

export default function ClubsDetailed({
  navigation,
  route: { params },
}: ClubsDetailedProps) {
  const colors = useColors();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Image
        style={{ height: 260, width: "100%" }}
        source={{ uri: params.img }}
      />
      <Text
        style={{
          paddingTop: 20,
          opacity: 0.85,
          fontSize: 25,
          paddingHorizontal: 16,
          paddingBottom: 25,
        }}
      >
        {params.name}
      </Text>
      <Text
        style={{
          fontSize: 20,
          paddingHorizontal: 16,
          paddingBottom: 9,
        }}
      >
        Описание
      </Text>
      <Text
        style={{
          paddingHorizontal: 16,
          lineHeight: 15,
        }}
      >
        {params.description}
      </Text>
      <Text
        onPress={() => Linking.openURL(params.link)}
        style={{
          backgroundColor: colors.text,
          color: colors.revertedText,
          marginTop: 60,
          textAlign: "center",
          paddingVertical: 16,
        }}
      >
        Записаться на сайте
      </Text>
    </ScrollView>
  );
}
