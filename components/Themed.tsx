import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
} from "react-native";
import { BackgroundTriangle } from "../assets/icons/BackgroundTriangle";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function BackgroundView(props: ViewProps) {
  const { style, lightColor, darkColor, children, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const backgroundColorTriangle = useThemeColor(
    {
      light: Colors.light.triangleBackground,
      dark: Colors.dark.triangleBackground,
    },
    "triangleBackground"
  );

  return (
    <DefaultView style={[{ backgroundColor, flex: 1 }, style]} {...otherProps}>
      <View style={{ position: "absolute" }}>
        <BackgroundTriangle color={backgroundColorTriangle} />
      </View>
      {children}
    </DefaultView>
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
