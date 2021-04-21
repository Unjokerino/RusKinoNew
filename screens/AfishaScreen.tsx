import moment from "moment";
import React, { useEffect } from "react";
import {
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { BackgroundView, View, Text } from "../components/Themed";
import { SCREEN_WIDTH } from "../constants";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { fetchAfisha } from "../store/actions";
import { afishaSelector } from "../store/selectors/schedule";
import { FormatedSeanses } from "../types/store/schedule";

export default function AfishaScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { isLoading, afisha, formatedAfisha } = useSelector(afishaSelector);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    dispatch(fetchAfisha());
  };

  const Item = (movie: FormatedSeanses) => <MovieCard {...movie} />;

  return (
    <BackgroundView>
      <SwitchSelector
        style={{ marginTop: 30, paddingHorizontal: 60 }}
        initial={0}
        onPress={(value) => {}}
        textColor={Colors[colorScheme].switcherColor} //'#7a44cf'
        selectedColor={Colors[colorScheme].switcherSelctedColor}
        buttonColor={Colors[colorScheme].switcherColor}
        hasPadding
        options={[
          { label: "Киноафиша", value: "f" },
          { label: "Скоро в кино", value: "m" },
        ]}
        testID="gender-switch-selector"
        accessibilityLabel="gender-switch-selector"
      />
      <ScrollView
        style={{ marginVertical: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.menuRow}>
          {[0, 1, 2, 3, 4].map((day) => {
            const date = moment().add(day, "days").format("DD/MM");
            return (
              <TouchableOpacity>
                <Text>{date}</Text>
                <View style={{}} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <SectionList
        sections={formatedAfisha}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[
              styles.header,
              { backgroundColor: Colors[colorScheme].tabBarBackground },
            ]}
          >
            {title}
          </Text>
        )}
      />
    </BackgroundView>
  );
}

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH,
    paddingHorizontal: 35,
    backgroundColor: "transparent",
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 8,
  },
});
