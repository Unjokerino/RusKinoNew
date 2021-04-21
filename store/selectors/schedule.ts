import { createSelector } from "reselect";
import { AFISHA } from "../../constants";
import { RootState } from "../../types/store";
import { formatSchedule } from "../../utils/schedule";

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
