import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useColors } from "../constants/Colors";
import { Clubs } from "../types/store/schedule";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { CLUBS_DETAILED } from "../constants";

export default function ClubItem({ item }: { item: Clubs }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const colors = useColors();
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate(CLUBS_DETAILED, item)}
      >
        {loading && (
          <ActivityIndicator
            color={colors.text}
            style={StyleSheet.absoluteFill}
          />
        )}
        <ImageBackground
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          key={item.name}
          style={{
            width: "100%",
            height: 201,
            borderRadius: 30,
            overflow: "hidden",
            marginBottom: 12,
          }}
          source={{ uri: item.img }}
        >
          <Entypo
            style={{ position: "absolute", right: 25, top: 18 }}
            name="heart-outlined"
            color="#fff"
            size={32}
          />
          <View
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              position: "absolute",
              bottom: 30,
              left: 28,
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flex: 1,
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "#000",
                opacity: 0.5,
              }}
            />
            <Text
              style={{
                color: "#fff",
              }}
            >
              {item.name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}
