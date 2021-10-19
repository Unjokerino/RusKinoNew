import {
  AFISHA,
  CLUBS,
  CLUBS_DETAILED,
  HOME,
  MOVIE_DETAILED,
  NEWS,
  REPERTOIRE,
  THEATRE,
  THEATRE_DETAILED,
  WEB_VIEW_SCREEN,
} from "./constants";
import { Afisha, Clubs } from "./types/store/schedule";

export type RootStackParamList = {
  Root: undefined;
  [WEB_VIEW_SCREEN]: { name: string; url: string };
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  [HOME]: undefined;
  [NEWS]: undefined;
  [REPERTOIRE]: undefined;
  [THEATRE]: undefined;
  [CLUBS]: undefined;
  [AFISHA]: undefined;
  [MOVIE_DETAILED]: Afisha;
  [WEB_VIEW_SCREEN]: { name: string; url: string };
  [THEATRE_DETAILED]: { info: any; seanse: any };
  [CLUBS_DETAILED]: Clubs;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
