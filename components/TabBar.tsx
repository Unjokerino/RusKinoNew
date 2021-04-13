import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "./Themed";
import { TabItem } from "./TabItem";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export interface TabBarProps {
  style?: StyleProp<ViewStyle>;
}

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps<BottomTabBarOptions>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const colorScheme = useColorScheme();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tabBar,
          { backgroundColor: Colors[colorScheme].tabBarBackground },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <TabItem label={label} onPress={onPress} active={isFocused} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,

    left: 0,
    right: 0,
    justifyContent: "center",
  },
  tabBar: {
    backgroundColor: "#fff",
    height: 65,

    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 33,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 16,
  },

  bar: {
    flexDirection: "row",
    height: 60,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
  },
  item: {
    flex: 1,
  },
});
