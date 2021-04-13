import { AFISHA, CLUBS, HOME, NEWS, REPERTOIRE, THEATRE } from "./constants";

export type RootStackParamList = {
  Root: undefined;
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
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
