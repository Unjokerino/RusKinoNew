import { useNavigation } from "@react-navigation/core";
import { current } from "immer";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { BackgroundView, View, Text } from "../components/Themed";
import { MOVIE_DETAILED, SCREEN_WIDTH } from "../constants";
import { useColors } from "../constants/Colors";
import { fetchAfisha } from "../store/actions";
import { afishaSelector } from "../store/selectors/schedule";
import { FormatedSeanses } from "../types/store/schedule";

const itemHeight = 302;

export default function AfishaScreen() {
  const colors = useColors();
  const dispatch = useDispatch();
  const sectionListRef = useRef<SectionList>(null);
  const { isLoading, formatedAfisha } = useSelector(afishaSelector);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const navigation = useNavigation();
  const scrollY = new Animated.Value(0);
  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = async () => {
    dispatch(fetchAfisha());
  };

  const Item = ({ movie }: { movie: FormatedSeanses }) => (
    <MovieCard
      onPress={() => navigation.navigate(MOVIE_DETAILED, movie)}
      movie={movie}
    />
  );

  const MenuRow = () => {
    return (
      <>
        {[0, 1, 2, 3, 4].map((day, index) => {
          const date = moment().add(day, "days").format("DD/MM");
          const prevY = formatedAfisha.reduce((prev, current, curentIndex) => {
            {
              return (prev =
                index - 1 > curentIndex
                  ? prev + current.data.length * itemHeight
                  : prev);
            }
          }, 0);

          const currentY = formatedAfisha.reduce(
            (prev, current, curentIndex) => {
              if (index > curentIndex) {
                return prev + current.data.length * itemHeight;
              }
              return prev;
            },
            0
          );

          const nextY = formatedAfisha.reduce(
            (prev, current, curentIndex) =>
              (prev =
                index + 1 > curentIndex
                  ? prev + current.data.length * itemHeight
                  : prev),
            0
          );

          const backgroundColor = scrollY.interpolate({
            inputRange: [prevY - 10, currentY, nextY, nextY + 50, nextY + 100],
            outputRange: [
              "#CFCFCF",
              "#990000",
              "#990000",
              "#CFCFCF",
              "#CFCFCF",
            ],
          });
          return (
            <TouchableOpacity
              onPress={() => {
                goToSection(index);
              }}
            >
              <Text>{date}</Text>
              <Animated.View
                style={{
                  marginTop: 3,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  height: 3,
                  width: "100%",
                  backgroundColor,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  const goToSection = useCallback(
    (sectionIndex) => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: sectionIndex,
        itemIndex: 0,
      });
    },
    [currentDateIndex]
  );

  return (
    <BackgroundView style={{ paddingTop: 100 }}>
      <View style={{ marginVertical: 30, backgroundColor: "transparent" }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.menuRow}>
            <MenuRow />
          </View>
        </ScrollView>
      </View>
      <SectionList
        stickySectionHeadersEnabled
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        viewabilityConfig={{ itemVisiblePercentThreshold: 0 }}
        ref={sectionListRef}
        sections={formatedAfisha}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <Item movie={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[
              styles.header,
              { backgroundColor: colors.tabBarBackground },
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
