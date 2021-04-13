import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import React, { useEffect, useRef } from "react";
import {
  ImageRequireSource,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { AFISHA, CLUBS, HOME, REPERTOIRE, THEATRE } from "../constants";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Text } from "./Themed";

export interface TabItemProps {
  style?: StyleProp<ViewStyle>;

  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
      }) => React.ReactNode);
  active: boolean;
  onPress: () => void;
}

const ICONS = {
  [HOME]: { name: "home", type: FontAwesome5 },
  [CLUBS]: { name: "people-sharp", type: Ionicons },
  [THEATRE]: { name: "mask", type: FontAwesome5 },
  [AFISHA]: { name: "ticket", type: FontAwesome },
  [REPERTOIRE]: { name: "theater-masks", type: FontAwesome5 },
};

export const TabItem: React.FC<TabItemProps> = ({
  style,
  label,
  active,
  onPress,
}) => {
  const Icon = ICONS[label].type;
  const iconName = ICONS[label].name;
  const colorScheme = useColorScheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const activeColor = "#c9379d";
  const inactiveColor = Colors[colorScheme].tabItem;

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      delay: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation(active ? 100 : 0);
  }, [active]);

  const paddingHorizontal = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [10, 20],
  });
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors[colorScheme].tabBarBackground, "#f6d6ee"],
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          style,
          { paddingHorizontal, backgroundColor },
        ]}
      >
        <View>
          <Icon
            color={active ? activeColor : inactiveColor}
            size={22}
            name={iconName}
          />
        </View>
        {active && (
          <View style={[styles.textContainer]}>
            <Animated.Text numberOfLines={1} style={[styles.label]}>
              {label}
            </Animated.Text>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 15,
  },
  textContainer: {
    marginLeft: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
});
