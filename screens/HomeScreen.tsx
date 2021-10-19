import React, { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacityBase,
} from "react-native";
import { View, BackgroundView, Text } from "../components/Themed";
import Typography from "../constants/Typography";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import Picker from "../components/Picker";
import ItemCard from "../components/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { afishaSelector } from "../store/selectors/schedule";
import { fetchAfisha } from "../store/actions";
import { Afisha } from "../types/store/schedule";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useColors } from "../constants/Colors";
import { BottomTabParamList } from "../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AFISHA, HOME, MOVIE_DETAILED } from "../constants";

type BottomTabParamListProp = BottomTabNavigationProp<
  BottomTabParamList,
  typeof HOME
>;

export default function HomeScreen() {
  const colors = useColors();
  const navigation = useNavigation<BottomTabParamListProp>();
  const dispatch = useDispatch();
  const { isLoading, afisha } = useSelector(afishaSelector);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    dispatch(fetchAfisha());
  };

  const renderItem = ({ item }: { item: Afisha }) => (
    <ItemCard
      onPress={() => navigation.navigate(MOVIE_DETAILED, item)}
      {...item}
    />
  );

  return (
    <BackgroundView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.menu}>
          <Text style={[Typography.title]}>Киноафиша</Text>
          <Picker />
        </View>

        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
          horizontal
          data={afisha}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.name + index}
        />

        <Text
          onPress={() => navigation.navigate(AFISHA)}
          style={[styles.button, { backgroundColor: colors.tabBarBackground }]}
        >
          Вся Киноафиша
        </Text>

        <Text style={[Typography.title, styles.title]}>Афиша событий</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
          horizontal
          data={afisha}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.name + index}
        />
      </ScrollView>
    </BackgroundView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 51,
    paddingBottom: 90,

    overflow: "hidden",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 180,
    textAlign: "center",
    marginVertical: 27,
    borderRadius: 16,
    alignSelf: "center",
  },
  menu: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 25,
    paddingRight: 11,
    backgroundColor: "transparent",
    marginBottom: 33,
  },
  logo: {
    alignSelf: "center",
    width: 170,
    height: 100,
    marginBottom: 28,
  },
  title: {
    paddingLeft: 25,
    paddingVertical: 12,
  },
  picker: {
    alignSelf: "center",
    paddingHorizontal: 20,
    height: 40,
    overflow: "hidden",
    width: 180,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
