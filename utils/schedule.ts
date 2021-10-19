import moment from "moment";
import { FormatedSeanses, Seanse, Theatre } from "../types/store/schedule";

interface Item {
  name: string;
  seanses: Seanse[];
}

export const formatSchedule = (items: Item[]) => {
  const dates: { date: moment.Moment; seanses: Seanse[]; data: any[] }[] = [
    0, 1, 2, 3, 4,
  ].map((day) => ({
    title: moment().add(day, "days").format("DD MMMM, dddd"),
    data: [],
    date: moment().add(day, "days"),
    seanses: [],
    index: day,
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

interface Type {
  date: string;
}

export function format(items: Theatre[]) {
  const dates: { date: string; info: any; data: any[] }[] = [];

  items.forEach((item) => {
    item.seanses.forEach((seanse) => {
      const isDayExists = dates.some(
        (date) =>
          moment(date.date).format("YYYY-DD-MM") ===
          moment(seanse.date).format("YYYY-DD-MM")
      );

      if (isDayExists) {
        dates.map((date) => {
          if (
            moment(date.date).format("YYYY-DD-MM") ===
            moment(seanse.date).format("YYYY-DD-MM")
          ) {
            return { ...date, data: [...date.data, seanse] };
          }
          return date;
        });
      } else {
        const formatedItem = {
          ...item,
          poster: item.poster || item.img_sobitiya,
        };
        const dateTemp = {
          date: moment(seanse.date).format("YYYY-MM-DD"),
          data: [seanse],
          info: { ...formatedItem, seanses: null },
        };
        dates.push(dateTemp);
      }
    });
  });

  return dates;
}
