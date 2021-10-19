import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, BackgroundView, Text } from "../components/Themed";
import { Image } from "../components/Image";
import RNPickerSelect from "react-native-picker-select";
import Typography from "../constants/Typography";
import { AFISHA, CLUBS, REPERTOIRE, THEATRE } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
const CITIES = [
  { label: "Ноябрьск", value: "Ноябрьск" },
  { label: "Вынгапур", value: "Вынгапур" },
];

export default function MenuScreen(props) {
  const { navigation } = props;

  const CardButton = ({
    title,
    onPress,
    icon,
  }: {
    title: string;
    onPress: () => void;
    icon: () => JSX.Element;
  }) => (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <View
        style={{
          width: 71,
          height: 71,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          //backgroundColor: colors.cardColor,
        }}
      >
        {icon}
      </View>
      <Text>{title}</Text>
    </TouchableOpacity>
  );

  const defaultIconOptions = {
    color: "#010002",
    size: 26,
  };

  const Icons = [
    {
      title: AFISHA,
      icon: <FontAwesome {...defaultIconOptions} name={"ticket"} />,
      onPress: () => navigation.navigate(AFISHA),
    },
    {
      title: REPERTOIRE,
      icon: <FontAwesome5 {...defaultIconOptions} name={"theater-masks"} />,
      onPress: () => navigation.navigate(REPERTOIRE),
    },
    {
      title: THEATRE,
      icon: <FontAwesome5 {...defaultIconOptions} name={"mask"} />,
      onPress: () => navigation.navigate(THEATRE),
    },
    {
      title: CLUBS,
      icon: <Ionicons {...defaultIconOptions} name={"people-sharp"} />,
      onPress: () => navigation.navigate(CLUBS),
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <BackgroundView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/ruslogo.png")}
        />
        <TouchableOpacity style={[styles.picker, {}]}>
          <RNPickerSelect
            value={CITIES[0]}
            placeholder={{}}
            onValueChange={(value) => console.log(value)}
            items={CITIES}
          />
        </TouchableOpacity>
        <Text style={[Typography.title, styles.title]}>Разделы приложения</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
          }}
        >
          {Icons.map((icon) => (
            <CardButton {...icon} />
          ))}
        </View>
        <Text style={[Typography.title, styles.title]}>Избранное</Text>
      </BackgroundView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 51,
  },
  logo: {
    alignSelf: "center",
    width: 170,
    height: 100,
    marginBottom: 28,
  },
  title: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  picker: {
    alignSelf: "center",
    paddingHorizontal: 20,
    height: 40,
    overflow: "hidden",
    width: 180,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
