import { createSelector } from "reselect";
import { AFISHA, REPERTOIRE, THEATRE } from "../../constants";
import { RootState } from "../../types/store";
import { format, formatSchedule } from "../../utils/schedule";

const scheduleSelector = (state: RootState) => state.scheduleReducer;
const loaderSelector = (state: RootState) => state.loadersReducer;
export const afishaSelector = createSelector(
  scheduleSelector,
  loaderSelector,
  ({ [AFISHA]: afisha }, { [AFISHA]: isLoading }) => {
    return {
      formatedAfisha: formatSchedule(afisha),
      afisha,
      isLoading,
    };
  }
);

export const theatreSelector = createSelector(
  scheduleSelector,
  loaderSelector,
  ({ [THEATRE]: theatre }, { [THEATRE]: isLoading }) => {
    return {
      formatedTheatre: format(theatre),
      theatre,
      isLoading,
    };
  }
);

export const repertoireSeelctor = createSelector(
  scheduleSelector,
  loaderSelector,
  ({ [REPERTOIRE]: repertoire }, { [REPERTOIRE]: isLoading }) => {
    return {
      formatedRepertoire: format(repertoire),
      repertoire,
      isLoading,
    };
  }
);
