import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { HOME, MOVIE_DETAILED, WEB_VIEW_SCREEN } from "../constants";
import { BottomTabParamList } from "../types";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Text } from "../components/Themed";
import { Image } from "../components/Image";
import WebView from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "../constants/Colors";
import moment from "moment";
import "moment/locale/ru";
import { Seanse } from "../types/store/schedule";

type BottomTabParamListProp = StackScreenProps<
  BottomTabParamList,
  typeof MOVIE_DETAILED
>;

export default function MovieScreen({
  navigation,
  route: { params },
}: BottomTabParamListProp) {
  const [loading, setLoading] = useState(false);

  const seanses = Object.entries(
    params.seanses.reduce<{ [key: string]: Seanse }>((prev, cur) => {
      const date = moment(cur.date).format("YYYY-MM-DD");
      const newStuff = (prev[date] = prev[date] ? [...prev[date], cur] : [cur]);
      return { ...prev, [date]: newStuff };
    }, {})
  ).map((item) => ({ date: item[0], seanses: item[1] }));
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentSeanseIndex, setCurrentSeanseIndex] = useState(0);
  const [idSession, setIdSession] = useState(
    seanses[0]?.seanses?.[0].id_session
  );
  const colors = useColors();
  const Schedule = () => {
    return (
      <>
        <ScrollView style={{ marginVertical: 20 }} horizontal>
          {seanses.map(({ date }, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCurrentSeanseIndex(index);
                  setIdSession(seanses[index].seanses[0].id_session);
                }}
                style={{
                  marginRight: 8,
                  borderWidth: 1,
                  backgroundColor:
                    currentSeanseIndex === index
                      ? colors.buttonColor
                      : "transparent",
                  borderColor: colors.buttonColor,
                  padding: 10,
                  borderRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color:
                      currentSeanseIndex === index
                        ? colors.revertedText
                        : colors.text,
                  }}
                >
                  {moment(date).locale("ru").format("DD MMM")}
                </Text>
                <Text
                  style={{
                    color:
                      currentSeanseIndex === index
                        ? colors.revertedText
                        : colors.text,
                    textTransform: "uppercase",
                  }}
                >
                  {moment(date).locale("ru").format("ddd")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={{ flexDirection: "row" }}>
          {seanses[currentSeanseIndex].seanses.map((seanse) => (
            <Text
              style={{
                paddingHorizontal: 17,
                paddingVertical: 11,
                borderWidth: 1,
                borderRadius: 4,
                marginRight: 14,
                color:
                  seanse.id_session === idSession
                    ? colors.revertedText
                    : colors.text,
                backgroundColor:
                  seanse.id_session === idSession
                    ? colors.buttonColor
                    : "transparent",
                borderColor: colors.buttonColor,
              }}
              onPress={() => {
                setIdSession(seanse.id_session);
              }}
            >
              {moment(seanse.date).format("HH:mm")}
            </Text>
          ))}
        </View>
      </>
    );
  };
  const Description = () => {
    return <Text style={{ paddingVertical: 20 }}>{params.desc}</Text>;
  };
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.posterContainer}>
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(0,0,0,0.3)"]}
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "100%",
              zIndex: 1,
            },
          ]}
        />
        <View style={styles.imageContainer}>
          <WebView
            style={styles.image}
            source={{
              uri: `https://youtube.com/embed/${params.youtube}`,
            }}
          />
        </View>

        <View style={{ flex: 1 }} />
        <Text style={styles.title}>{params.name}</Text>
      </View>

      <View style={[styles.row, styles.movieInfo]}>
        <Image style={styles.poster} source={{ uri: params.poster }} />

        <View style={{ justifyContent: "center", paddingHorizontal: 15 }}>
          <Text style={styles.movieInfotext}>Режисер: {params.regisser}</Text>
          <Text style={styles.movieInfotext}>Год: {params.year}</Text>
          <Text style={styles.movieInfotext}>Страна: {params.country}</Text>
          <Text style={styles.movieInfotext}>Рейтинг: {params.vozvrast}+</Text>
        </View>
        <FontAwesome
          name="heart-o"
          style={{ right: 10 }}
          color={colors.text}
          size={24}
        />
      </View>
      <View style={{ paddingHorizontal: 15, paddingTop: 26 }}>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <Text
            onPress={() => setCurrentTabIndex(0)}
            style={[
              styles.menuTitle,
              currentTabIndex === 0 && { fontWeight: "bold" },
            ]}
          >
            Расписание
          </Text>
          <Text
            onPress={() => setCurrentTabIndex(1)}
            style={[
              styles.menuTitle,
              currentTabIndex === 1 && { fontWeight: "bold" },
            ]}
          >
            О фильме
          </Text>
        </View>
        <View
          style={{
            marginTop: 8,
            backgroundColor: colors.darkerGray,
            height: 1,
            width: "100%",
          }}
        >
          <View
            style={[
              {
                height: "100%",
                width: "50%",
                position: "absolute",
                backgroundColor: colors.borderColor,
              },
              currentTabIndex === 1 ? { left: 0 } : { right: 0 },
            ]}
          />
        </View>
        {currentTabIndex === 0 ? <Schedule /> : <Description />}
      </View>

      <TouchableOpacity
        disabled={!idSession}
        style={{
          width: "100%",
          height: 63,
          backgroundColor: colors.buttonColor,
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.push(WEB_VIEW_SCREEN, {
            url: `https://kinowidget.kinoplan.ru/seats/776/${params.id_film}/${idSession}`,
            name: params.name,
          });
        }}
      >
        <Text
          style={{
            color: colors.revertedText,
            fontSize: 20,
            textAlign: "center",
            opacity: idSession ? 1 : 0.8,
          }}
        >
          {idSession ? "Купить билет" : "Купить билет в кассе"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  posterContainer: {
    height: 260,
  },
  menuTitle: {
    fontSize: 20,
    fontFamily: "niramit",
    lineHeight: 26,
  },
  movieInfotext: {
    width: 200,
    fontSize: 15,
    fontFamily: "niramit",
    lineHeight: 32,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
  },
  poster: {
    height: 180,
    width: 103,
    borderRadius: 4,
  },
  movieInfo: {
    paddingHorizontal: 15,
    paddingTop: 32,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    marginVertical: 20,
    marginHorizontal: 11,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    position: "absolute",
    height: 260,
    width: "100%",
  },
});
