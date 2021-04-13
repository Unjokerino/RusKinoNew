import { Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import { View } from "react-native";
import { TabBar } from "../components/TabBar";
import { AFISHA, CLUBS, HOME, REPERTOIRE, THEATRE } from "../constants";
import HomeScreen from "../screens/HomeScreen";
import AfishaScreen from "../screens/AfishaScreen";
import TheatreScreen from "../screens/TheatreScreen";
import RepertoireScreen from "../screens/RepertoireScreen";
import ClubsScreen from "../screens/ClubsScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const defaultOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  return (
    <BottomTab.Navigator
      tabBar={(props) => (
        <TabBar
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
        />
      )}
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen name={HOME} component={HomeNavigator} options={{}} />
      <BottomTab.Screen
        name={AFISHA}
        component={AfishaNavigator}
        options={{}}
      />

      <BottomTab.Screen name={THEATRE} component={TheatreScreen} options={{}} />
      <BottomTab.Screen
        name={REPERTOIRE}
        component={RepertoireScreen}
        options={{}}
      />
      <BottomTab.Screen name={CLUBS} component={ClubsScreen} options={{}} />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator();

const AfishaStack = createStackNavigator();

const TheatreStack = createStackNavigator();

const RepertoireStack = createStackNavigator();

const ClubsStack = createStackNavigator();

function HomeNavigator() {
  const colorScheme = useColorScheme();
  const HeaderRight = () => (
    <View style={{ flexDirection: "row" }}>
      <FontAwesome color={"#fff"} size={24} name="sun-o" />
      <FontAwesome color={"#fff"} size={24} name="calendar" />
      <Entypo color={"#fff"} size={24} name="dots-three-vertical" />
    </View>
  );
  const defaultOptions: StackNavigationOptions = {
    headerTitleAlign: "left",
    headerStyle: {
      backgroundColor: Colors[colorScheme].headerBackground,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerRight: HeaderRight,
  };

  const homeOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HOME}
        component={HomeScreen}
        options={{ ...homeOptions }}
      />
    </HomeStack.Navigator>
  );
}

function AfishaNavigator() {
  const colorScheme = useColorScheme();
  const HeaderRight = () => (
    <View style={{ flexDirection: "row" }}>
      <FontAwesome color={"#fff"} size={24} name="sun-o" />
      <FontAwesome color={"#fff"} size={24} name="calendar" />
      <Entypo color={"#fff"} size={24} name="dots-three-vertical" />
    </View>
  );
  const defaultOptions: StackNavigationOptions = {
    headerTitleAlign: "left",
    headerStyle: {
      backgroundColor: Colors[colorScheme].headerBackground,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerRight: HeaderRight,
  };

  const homeOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <AfishaStack.Navigator>
      <AfishaStack.Screen
        name={AFISHA}
        component={AfishaScreen}
        options={{ ...defaultOptions }}
      />
    </AfishaStack.Navigator>
  );
}
