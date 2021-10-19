import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "../components/Image";
import { THEATRE_DETAILED } from "../constants";
import { useColors } from "../constants/Colors";
import { BottomTabParamList } from "../types";

type DetailedTheatreScreenProps = StackScreenProps<
  BottomTabParamList,
  typeof THEATRE_DETAILED
>;

export default function DetailedTheatreScreen({
  navigation,
  route: { params },
}: DetailedTheatreScreenProps) {
  const colors = useColors();

  useEffect(() => {
    navigation.setOptions({ title: params?.info.name });
    console.warn(params);
  }, []);
  return (
    <View>
      <Image
        style={{ height: 260, width: "100%" }}
        source={{ uri: params?.info.poster }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 350 }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}
        >
          <View style={styles.row}>
            <Text style={styles.movieInfotext}>Дата события:</Text>
            <Text style={styles.movieInfotext}>{params?.seanse.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.movieInfotext}>Место:</Text>
            <Text style={[styles.movieInfotext, { textAlign: "right" }]}>
              {params?.info.mesto_sobitiya}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.movieInfotext}>Стоимость:</Text>
            <Text style={styles.movieInfotext}>{params?.info.price}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.title}>Описание</Text>
          <Text>{params?.info?.mobile || params?.info?.desc}</Text>
        </View>
        <Text
          style={{
            backgroundColor: colors.text,
            color: colors.revertedText,
            marginTop: 60,
            textAlign: "center",
            paddingVertical: 16,
          }}
        >
          Купить билет на кассе
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "roboto",
    fontSize: 20,
  },
  movieInfotext: {
    maxWidth: 250,
    fontSize: 15,
    fontFamily: "niramit",
    lineHeight: 32,
  },
});
