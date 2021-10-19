import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image as DefaultImage,
  ImageStyle,
  StyleProp,
  ImageProps,
  ImageSourcePropType,
} from "react-native";
import { useColors } from "../constants/Colors";

export function Image({
  style,
  source,
  ...otherProps
}: {
  style: StyleProp<ImageStyle>;
  source: ImageSourcePropType;
  otherProps?: ImageProps;
}) {
  const colors = useColors();
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && (
        <ActivityIndicator
          style={[StyleSheet.absoluteFill, style]}
          color={colors.headerBackground}
        />
      )}
      <DefaultImage
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={style}
        {...otherProps}
        source={source}
      />
    </>
  );
}
