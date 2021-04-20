import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Afisha } from "../types/store/schedule";

export default function ItemCard({ name, poster, seanses }: Afisha) {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: Colors[colorScheme].cardColor }]}
    >
      {loading && (
        <View style={[styles.loader]}>
          <ActivityIndicator color={Colors[colorScheme].headerBackground} />
        </View>
      )}
      <Image
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={styles.image}
        source={{
          uri: poster,
        }}
      />
      <View style={[styles.info]}>
        <Text numberOfLines={2} style={styles.title}>
          {name}
        </Text>
        <View style={styles.dates}>
          {seanses.map((seanse) => (
            <View
              style={[
                styles.date,
                { borderColor: Colors[colorScheme].tabIconDefault },
              ]}
            >
              <Text numberOfLines={1} style={styles.dateText}>
                {moment(seanse.date).format("hh:mm")}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 11,
    height: 261,
    width: 164,
    overflow: "hidden",
    borderRadius: 8,
  },
  loader: {
    position: "absolute",
    width: "100%",
    top: 90,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    zIndex: 1,
  },
  dates: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-around",
  },
  dateText: {
    fontSize: 10,
  },
  date: {
    marginHorizontal: 2,
    marginBottom: 6,
    borderRadius: 13,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  image: {
    flex: 2,
  },
});
