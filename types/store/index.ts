import { SystemProps } from "../../constants/Types";
import { ScheduleProps } from "./schedule";
import { LoadersProps } from "./loaders";

export type RootState = {
  readonly scheduleReducer: ScheduleProps;
  readonly loadersReducer: LoadersProps;
  readonly systemReducer: SystemProps;
};
