import React from "react";
import { Image, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../constants";
import { Afisha, FormatedSeanses } from "../types/store/schedule";
import { View, Text } from "./Themed";

export default function MovieCard({
  title: movie,
}: {
  title: FormatedSeanses;
}) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: movie.poster }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.name}</Text>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.ganre}>
            {movie.ganre.join(", ")}
          </Text>
          <Text>
            {movie.year} | {movie.country[0]}
          </Text>
        </View>
      </View>
    </View>
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
    maxWidth: "60%",
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  image: {
    width: SCREEN_WIDTH - 30,
    marginHorizontal: 15,
    borderRadius: 30,
    height: SCREEN_WIDTH / 2,
  },
});
