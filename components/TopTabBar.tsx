import React, { useMemo } from "react";

import { Animated, View, TouchableOpacity } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { useColors } from "../constants/Colors";
import { Text } from "./Themed";

export function TopTabBar({ state, descriptors, navigation, position }) {
  const colors = useColors();
  const right = position.interpolate({
    inputRange: state.routes.map((_, i) => i),
    outputRange: [10, 150],
  });

  const currentLabel = useMemo(() => {
    const label = state.routeNames[state.index];
    return label;
  }, [state]);

  console.log(state);
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
        flexDirection: "row",
        marginTop: 140,
        width: 300,
        alignSelf: "center",
        backgroundColor: colors.switcherSelctedColor,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: colors.text,
          borderRadius: 10,
          width: "48%",
          zIndex: 1,
          position: "absolute",
          transform: [{ translateX: right }],
          height: 24,
          alignSelf: "center",
        }}
      >
        <Text style={{ color: colors.revertedText, textAlign: "center" }}>
          {currentLabel}
        </Text>
      </Animated.View>
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
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };
        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 0 : 1)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1, paddingHorizontal: 10 }}
          >
            <Animated.Text
              numberOfLines={1}
              style={{
                opacity,
                color: colors.text,
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
