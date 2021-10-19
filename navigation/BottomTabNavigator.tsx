import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import * as React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useColors } from "../constants/Colors";
import { BottomTabParamList } from "../types";
import { View } from "react-native";
import { TabBar } from "../components/TabBar";
import {
  AFISHA,
  AFISHA_SOON_TAB,
  AFISHA_TAB,
  CLUBS,
  CLUBS_DETAILED,
  HOME,
  MOVIE_DETAILED,
  REPERTOIRE,
  REPERTOIRE_DETAILED,
  THEATRE,
  THEATRE_DETAILED,
  WEB_VIEW_SCREEN,
} from "../constants";
import HomeScreen from "../screens/HomeScreen";
import AfishaScreen from "../screens/AfishaScreen";
import TheatreScreen from "../screens/TheatreScreen";
import RepertoireScreen from "../screens/RepertoireScreen";
import ClubsScreen from "../screens/ClubsScreen";
import { useNavigation } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MovieScreen from "../screens/MovieScreen";
import WebViewScreen from "../screens/WebViewScreen";
import DetailedTheatreScreen from "../screens/DetailedTheatreScreen";
import ClubsDetailed from "../screens/ClubsDetailed";
import { TopTabBar } from "../components/TopTabBar";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colors = useColors();

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
      tabBarOptions={{ activeTintColor: colors.tint }}
    >
      <BottomTab.Screen name={HOME} component={HomeNavigator} options={{}} />
      <BottomTab.Screen
        name={AFISHA}
        component={MovieTabsNavigator}
        options={{}}
      />

      <BottomTab.Screen
        name={THEATRE}
        component={TheatreNavigator}
        options={{}}
      />
      <BottomTab.Screen
        name={REPERTOIRE}
        component={RepertoireNavigator}
        options={{}}
      />
      <BottomTab.Screen name={CLUBS} component={ClubsNavigator} options={{}} />
    </BottomTab.Navigator>
  );
}

export const useDefaultOptions = () => {
  const colors = useColors();

  const HeaderRight = () => (
    <View style={{ flexDirection: "row" }}>
      <FontAwesome color={"#fff"} size={24} name="calendar" />
      <Entypo
        style={{ marginHorizontal: 20 }}
        color={"#fff"}
        size={24}
        name="dots-three-vertical"
      />
    </View>
  );

  const HeaderLeft = () => {
    const navigation = useNavigation();
    const canGoBack = navigation.canGoBack();
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {canGoBack ? (
          <Entypo
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 20 }}
            color={"#fff"}
            size={24}
            name="arrow-left"
          />
        ) : (
          <Entypo
            onPress={() => navigation.openDrawer()}
            style={{ marginHorizontal: 20 }}
            color={"#fff"}
            size={24}
            name="menu"
          />
        )}
      </View>
    );
  };
  const defaultOptions: StackNavigationOptions = {
    headerTitleAlign: "left",
    headerStyle: {
      backgroundColor: colors.headerBackground,
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      paddingRight: 30,
      fontWeight: "bold",
    },
    headerLeft: HeaderLeft,
    headerRight: HeaderRight,
  };
  return defaultOptions;
};

const HomeStack = createStackNavigator();

const AfishaStack = createStackNavigator();

const TheatreStack = createStackNavigator();

const RepertoireStack = createStackNavigator();

const ClubsStack = createStackNavigator();

const MovieTabs = createMaterialTopTabNavigator();

function HomeNavigator() {
  const defaultOptions = useDefaultOptions();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HOME}
        component={HomeScreen}
        options={{ ...defaultOptions }}
      />
      <HomeStack.Screen
        name={MOVIE_DETAILED}
        component={MovieScreen}
        options={{ ...defaultOptions, title: "Киноафиша" }}
      />
    </HomeStack.Navigator>
  );
}

function MovieTabsNavigator() {
  return (
    <MovieTabs.Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <MovieTabs.Screen name={AFISHA_TAB} component={AfishaNavigator} />
      <MovieTabs.Screen name={AFISHA_SOON_TAB} component={SoonNavigator} />
    </MovieTabs.Navigator>
  );
}

function AfishaNavigator() {
  const defaultOptions = useDefaultOptions();
  return (
    <AfishaStack.Navigator>
      <AfishaStack.Screen
        name={AFISHA}
        component={AfishaScreen}
        options={{ ...defaultOptions }}
      />
      <AfishaStack.Screen
        name={MOVIE_DETAILED}
        component={MovieScreen}
        options={{ ...defaultOptions, title: "Киноафиша" }}
      />
      <AfishaStack.Screen
        options={{ ...defaultOptions }}
        name={WEB_VIEW_SCREEN}
        component={WebViewScreen}
      />
    </AfishaStack.Navigator>
  );
}

function SoonNavigator() {
  const defaultOptions = useDefaultOptions();
  return (
    <AfishaStack.Navigator>
      <AfishaStack.Screen
        name={AFISHA}
        component={AfishaScreen}
        options={{ ...defaultOptions, title: "Скоро в кино" }}
      />
      <AfishaStack.Screen
        name={MOVIE_DETAILED}
        component={MovieScreen}
        options={{ ...defaultOptions, title: "Скоро в кино" }}
      />
      <AfishaStack.Screen
        options={{ ...defaultOptions }}
        name={WEB_VIEW_SCREEN}
        component={WebViewScreen}
      />
    </AfishaStack.Navigator>
  );
}

function TheatreNavigator() {
  const defaultOptions = useDefaultOptions();

  return (
    <TheatreStack.Navigator>
      <TheatreStack.Screen
        name={THEATRE}
        component={TheatreScreen}
        options={{ ...defaultOptions }}
      />
      <TheatreStack.Screen
        name={THEATRE_DETAILED}
        component={DetailedTheatreScreen}
        options={{ ...defaultOptions, title: "Театр" }}
      />
    </TheatreStack.Navigator>
  );
}

function RepertoireNavigator() {
  const defaultOptions = useDefaultOptions();

  return (
    <RepertoireStack.Navigator>
      <RepertoireStack.Screen
        name={REPERTOIRE}
        component={RepertoireScreen}
        options={{ ...defaultOptions }}
      />
      <TheatreStack.Screen
        name={REPERTOIRE_DETAILED}
        component={DetailedTheatreScreen}
        options={{ ...defaultOptions, title: "Театр" }}
      />
    </RepertoireStack.Navigator>
  );
}

function ClubsNavigator() {
  const defaultOptions = useDefaultOptions();

  return (
    <ClubsStack.Navigator>
      <ClubsStack.Screen
        name={CLUBS}
        component={ClubsScreen}
        options={{ ...defaultOptions }}
      />
      <ClubsStack.Screen
        name={CLUBS_DETAILED}
        component={ClubsDetailed}
        options={{ ...defaultOptions, title: "Клубы" }}
      />
    </ClubsStack.Navigator>
  );
}
