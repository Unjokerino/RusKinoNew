import { AFISHA, CLUBS, NEWS, REPERTOIRE, THEATRE } from "../../constants";
import {
  AFISHA_SUCCESS,
  CLUBS_SUCCESS,
  NEWS_SUCCESS,
  REPERTOIRE_SUCCESS,
  THEATRE_SUCCESS,
} from "../action-types";

const initialState = {
  [AFISHA]: [],
  [THEATRE]: [],
  [REPERTOIRE]: [],
  [CLUBS]: [],
  [NEWS]: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AFISHA_SUCCESS:
      return {
        ...state,
        [AFISHA]: action.payload,
      };
    case THEATRE_SUCCESS:
      return {
        ...state,
        [THEATRE]: action.payload,
      };
    case REPERTOIRE_SUCCESS:
      return {
        ...state,
        [REPERTOIRE]: action.payload,
      };
    case CLUBS_SUCCESS:
      return {
        ...state,
        [CLUBS]: action.payload,
      };
    case NEWS_SUCCESS:
      return {
        ...state,
        [NEWS]: action.payload,
      };
    default:
      return state;
  }
};
