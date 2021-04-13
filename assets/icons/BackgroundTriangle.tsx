import React from "react";
import Svg, { Path } from "react-native-svg";

export const BackgroundTriangle = ({
  color = "#201E2D",
}: {
  color: string;
}) => (
  <Svg width="375" height="253" viewBox="0 0 375 253" fill="none">
    <Path d="M375 0H0V253L375 109.644V0Z" fill={color} />
  </Svg>
);
