import moment from "moment";
import { FormatedSeanses, Seanse } from "../types/store/schedule";

interface Item {
  name: string;
  seanses: Seanse[];
}

export const formatSchedule = (items: Item[]) => {
  const dates: { date: moment.Moment; seanses: Seanse[]; data: any[] }[] = [
    0,
    1,
    2,
    3,
    4,
  ].map((day) => ({
    title: moment().add(day, "days").format("DD MMMM, dddd"),
    data: [],
    date: moment().add(day, "days"),
    seanses: [],
  }));

  items.forEach((item) => {
    item.seanses.forEach((seanse) => {
      dates.forEach((date, index) => {
        const isTheSameDay =
          moment(date.date).format("YYYY-DD-MM") ===
          moment(seanse.date).format("YYYY-DD-MM");

        if (isTheSameDay) {
          const isExist = dates[index].data.find(
            (seanse) => seanse.name === item.name
          );
          !isExist && dates[index].data.push({ ...item });
        }
      });
    });
  });

  return dates;
};
