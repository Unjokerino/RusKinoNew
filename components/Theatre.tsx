import moment from "moment";
import React, { useCallback } from "react";
import {
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View as DefaultView,
} from "react-native";
import { BackgroundView, Text, View } from "../components/Themed";
import { useColors } from "../constants/Colors";
import { Image } from "../components/Image";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

interface Props {
  data: any;
  detailedScreen: string;
}

export default function Theatre({ detailedScreen, data }: Props) {
  const colors = useColors();
  const navigation = useNavigation();

  const Item = useCallback(({ item, section }) => {
    return (
      <TouchableOpacity
        key={item.date + section?.info.name}
        onPress={() =>
          navigation.navigate(detailedScreen, {
            seanse: item,
            info: section?.info,
          })
        }
        style={[
          styles.itemContainer,
          { backgroundColor: colors.tabBarBackground },
        ]}
      >
        <Image style={{ flex: 1 }} source={{ uri: section?.info.poster }} />
        <View style={styles.itemInfoContainer}>
          <Text style={[styles.text, styles.title]}>{section?.info.name}</Text>
          {section?.info.short_desc && (
            <Text style={{ opacity: 0.5 }}>{section?.info.short_desc}</Text>
          )}
          <DefaultView style={{ flex: 1, alignSelf: "flex-start" }}>
            <Text
              style={[
                styles.date,
                {
                  color: colors.revertedText,
                  backgroundColor: colors.buttonColor,
                },
              ]}
            >
              {moment(item.date).format("HH:mm")}
            </Text>
          </DefaultView>
        </View>
        <FontAwesome name="heart-o" color={colors.text} size={24} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <BackgroundView>
      <SectionList
        stickySectionHeadersEnabled
        style={{ paddingTop: 25 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        sections={data}
        renderItem={({ item, section }) => (
          <Item section={section} item={item} />
        )}
        renderSectionHeader={({ section: { date } }) => (
          <Text
            style={[
              styles.header,
              { backgroundColor: colors.tabBarBackground },
            ]}
          >
            {moment(date).format("DD MMMM, dddd ")}
          </Text>
        )}
      />
    </BackgroundView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 8,
  },
  title: { flex: 1, fontWeight: "bold", fontSize: 16 },
  text: {
    fontFamily: "poppins",
  },
  date: {
    textAlign: "center",
    flex: 1,
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer: {
    borderRadius: 8,
    padding: 11,
    marginHorizontal: 15,
    marginBottom: 13,
    flexDirection: "row",
  },
  itemInfoContainer: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "transparent",
  },
});
