import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
} from "react-native";
import { BackgroundTriangle } from "../assets/icons/BackgroundTriangle";
import { Colors, useColors } from "../constants/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const colors = useColors();
  const colorFromProps = colors;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorName];
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
  const { text: color } = useColors();

  return (
    <DefaultText
      style={[{ color, fontFamily: "roboto" }, style]}
      {...otherProps}
    />
  );
}

export function BackgroundView(props: ViewProps) {
  const { style, lightColor, darkColor, children, ...otherProps } = props;
  const { triangleBackground, background: backgroundColor } = useColors();
  return (
    <DefaultView style={[{ backgroundColor, flex: 1 }, style]} {...otherProps}>
      <View style={{ position: "absolute", left: 0, right: 0 }}>
        <BackgroundTriangle color={triangleBackground} />
      </View>
      {children}
    </DefaultView>
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { background: backgroundColor } = useColors();

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
