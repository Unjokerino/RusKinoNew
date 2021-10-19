import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundView, Text } from "../components/Themed";
import { CLUBS } from "../constants";
import { useColors } from "../constants/Colors";
import { theatreSelector } from "../store/selectors/schedule";
import { RootState } from "../types/store";
import { fetchClubs } from "../store/actions";
import { ActivityIndicator, ImageBackground } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Clubs } from "../types/store/schedule";
import ClubItem from "../components/ClubItem";
export default function ClubsScreen() {
  const dispatch = useDispatch();
  const colors = useColors();
  const clubs = useSelector((state: RootState) => state.scheduleReducer[CLUBS]);
  useEffect(() => {
    dispatch(fetchClubs());
  }, []);

  const renderItem = ({ item }: { item: Clubs }) => {
    return <ClubItem key={item.name} item={item} />;
  };
  return (
    <BackgroundView>
      <FlatList
        style={{ paddingHorizontal: 12, paddingTop: 20 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={clubs}
        renderItem={renderItem}
      />
    </BackgroundView>
  );
}
