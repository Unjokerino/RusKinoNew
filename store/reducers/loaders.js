import { AFISHA, CLUBS, NEWS, REPERTOIRE, THEATRE } from "../../constants";
import {
  AFISHA_FAIL,
  AFISHA_LOAD,
  AFISHA_SUCCESS,
  CLUBS_FAIL,
  CLUBS_LOAD,
  CLUBS_SUCCESS,
  NEWS_FAIL,
  NEWS_LOAD,
  NEWS_SUCCESS,
  REPERTOIRE_FAIL,
  REPERTOIRE_LOAD,
  REPERTOIRE_SUCCESS,
  THEATRE_FAIL,
  THEATRE_LOAD,
  THEATRE_SUCCESS,
} from "../action-types";

const initialState = {
  [AFISHA]: false,
  [THEATRE]: false,
  [REPERTOIRE]: false,
  [CLUBS]: false,
  [NEWS]: false,
};

const set = (value, state) => (loader) => ({ ...state, [loader]: value });

export default (state = initialState, action) => {
  const on = set(true, state);
  const off = set(false, state);
  switch (action.type) {
    case AFISHA_LOAD:
      return on(AFISHA);
    case AFISHA_SUCCESS:
    case AFISHA_FAIL:
      return off(AFISHA);
    case THEATRE_LOAD:
      return on(THEATRE);
    case THEATRE_SUCCESS:
    case THEATRE_FAIL:
      return off(THEATRE);
    case REPERTOIRE_LOAD:
      return on(REPERTOIRE);
    case REPERTOIRE_SUCCESS:
    case REPERTOIRE_FAIL:
      return off(REPERTOIRE);
    case CLUBS_LOAD:
      return on(CLUBS);
    case CLUBS_SUCCESS:
    case CLUBS_FAIL:
      return off(CLUBS);
    case NEWS_LOAD:
      return on(NEWS);
    case NEWS_SUCCESS:
    case NEWS_FAIL:
      return off(NEWS);
    default:
      return state;
  }
};
