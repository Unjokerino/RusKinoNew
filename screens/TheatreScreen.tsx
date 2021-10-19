import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { fetchTheatre } from "../store/actions";
import { theatreSelector } from "../store/selectors/schedule";

import Theatre from "../components/Theatre";
import { THEATRE_DETAILED } from "../constants";

export default function TheatreScreen() {
  const dispatch = useDispatch();
  const { formatedTheatre } = useSelector(theatreSelector);
  useEffect(() => {
    dispatch(fetchTheatre());
  }, []);
  return <Theatre data={formatedTheatre} detailedScreen={THEATRE_DETAILED} />;
}
