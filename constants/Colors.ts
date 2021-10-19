import { useColorScheme } from "react-native";

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000",
    revertedText: "#fff",
    switcherColor: "#1C1C1E",
    buttonColor: "#121022",
    tabBarBackground: "#fff",
    headerBackground: "#EF0000",
    switcherSelctedColor: "#E5E5E5",
    tabItem: "#D2D2D2",
    darkerGray: "#333333",
    background: "#E5E5E5",
    cardColor: "#F5F5F5",
    tint: tintColorLight,
    borderColor: "#F7F7F7",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    triangleBackground: "#E5E1FF",
  },
  dark: {
    text: "#fff",
    revertedText: "#000",
    buttonColor: "#fff",
    tabItem: "#fff",
    switcherColor: "#1C1C1E",
    switcherSelctedColor: "#E5E5E5",
    darkerGray: "#333333",
    tabBarBackground: "#38354B",
    headerBackground: "#38354B",
    cardColor: "#F5F5F5",
    background: "#1C1A29",
    borderColor: "#F7F7F7",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    triangleBackground: "#201E2D",
  },
};
export const useColors = () => {
  const colorScheme = useColorScheme();

  return Colors[colorScheme || "light"];
};
