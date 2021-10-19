import moment from "moment";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "../constants";
import { Afisha, FormatedSeanses } from "../types/store/schedule";
import { View, Text } from "./Themed";
import { Image } from "./Image";

export default function MovieCard({
  movie: movie,
  onPress,
}: {
  movie: FormatedSeanses;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <View style={{ width: "100%", borderRadius: 30, height: "100%" }}>
          <Image style={styles.image} source={{ uri: movie.poster }} />
        </View>
        <ScrollView
          horizontal
          style={{
            zIndex: 99,
            position: "absolute",
            bottom: 22,
            width: "100%",
            paddingHorizontal: 20,
          }}
          contentContainerStyle={[
            styles.row,
            {
              backgroundColor: "transparent",
            },
          ]}
        >
          {movie?.seanses.map((seanse) => (
            <View
              style={{
                marginRight: 12,
                flex: 1,
                borderRadius: 15,
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            >
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: "black",
                  opacity: 0.5,
                }}
              />
              <Text
                style={{
                  zIndex: 1,
                  color: "#fff",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                }}
              >
                {moment(seanse.date).format("HH:mm")}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.name}</Text>
        <View
          style={[
            styles.row,
            { alignItems: "center", justifyContent: "space-between" },
          ]}
        >
          <Text numberOfLines={1} style={styles.ganre}>
            {movie.ganre.join(", ")}
          </Text>
          <Text numberOfLines={1} style={[styles.text, {}]}>
            {movie.year} | {movie.country[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {},
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ganre: {
    textTransform: "capitalize",
    maxWidth: "60%",
    fontFamily: "roboto-condensed",
    fontSize: 20,
  },
  text: {
    fontFamily: "roboto-condensed",
  },
  title: {
    fontSize: 20,
    fontFamily: "roboto-condensed-bold",
    fontWeight: "bold",
  },
  infoContainer: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  imageContainer: {
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    borderRadius: 30,
    height: SCREEN_WIDTH / 2,
  },
  image: {
    width: "100%",
    borderRadius: 30,
    height: "100%",
  },
});
