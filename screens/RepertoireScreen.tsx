import moment from "moment";
import React, { useEffect } from "react";
import { SectionList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BackgroundView, Text, View } from "../components/Themed";
import { useColors } from "../constants/Colors";
import { fetchRepertoires } from "../store/actions";
import { repertoireSeelctor } from "../store/selectors/schedule";

import { Image } from "../components/Image";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Theatre from "../components/Theatre";
import { REPERTOIRE_DETAILED } from "../constants";

export default function RepertoireScreen() {
  const dispatch = useDispatch();
  const { formatedRepertoire } = useSelector(repertoireSeelctor);
  useEffect(() => {
    dispatch(fetchRepertoires());
  }, []);

  return (
    <Theatre data={formatedRepertoire} detailedScreen={REPERTOIRE_DETAILED} />
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 8,
  },
  text: {
    fontFamily: "poppins",
  },
});
