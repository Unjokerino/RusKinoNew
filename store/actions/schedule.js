import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import {
  AFISHA_FAIL,
  AFISHA_SUCCESS,
  CLUBS_SUCCESS,
  CLUBS_FAIL,
  NEWS_FAIL,
  NEWS_SUCCESS,
  REPERTOIRE_FAIL,
  REPERTOIRE_SUCCESS,
  THEATRE_FAIL,
  THEATRE_SUCCESS,
} from "../action-types";

export const getFavorites = () => async (dispatch) => {
  const authReducer = await AsyncStorage.getItem("favorites");
  dispatch({
    type: GET_SIGN_IN_INFO,
    identity: authReducer ? JSON.parse(authReducer) : {},
  });
};

export const fetchAfisha = () => async (dispatch) => {
  try {
    const response = await api.fetchAfisha();
    const payload = await response.json();
    dispatch({ type: AFISHA_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: AFISHA_FAIL, error });
  }
};

export const fetchTheatre = () => async (dispatch) => {
  try {
    const response = await api.fetchTheatre();
    const payload = await response.json();
    dispatch({ type: THEATRE_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: THEATRE_FAIL, error });
  }
};

export const fetchClubs = () => async (dispatch) => {
  try {
    const response = await api.fetchClubs();
    const payload = await response.json();
    dispatch({ type: CLUBS_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: CLUBS_FAIL, error });
  }
};

export const fetchRepertoires = () => async (dispatch) => {
  try {
    const response = await api.fetchRepertoires();
    const payload = await response.json();
    dispatch({ type: REPERTOIRE_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: REPERTOIRE_FAIL, error });
  }
};

export const fetchNews = () => async (dispatch) => {
  try {
    const response = await api.fetchNews();
    const payload = await response.json();
    dispatch({ type: NEWS_SUCCESS, payload });
  } catch (error) {
    dispatch({ type: NEWS_FAIL, error });
  }
};
