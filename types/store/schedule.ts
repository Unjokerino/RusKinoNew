import { AFISHA, CLUBS, NEWS, THEATRE } from "../../constants";

export interface ScheduleProps {
  [AFISHA]: Afisha[];
  [NEWS]: News[];
  [CLUBS]: Clubs[];
  [THEATRE]: Theatre[];
}

export interface News {
  name: string;
  date: string;
  link: string;
  img_sobitiya: string;
  short_desc: string;
  mobile: string;
  city: null;
}

export interface Clubs {
  name: string;
  link: string;
  img: string;
  description: string;
  gallery: null;
}

export interface Theatre {
  name: string;
  link: string;
  type_afisha: TypeAfisha;
  img_sobitiya: string;
  short_desc: string;
  mobile: string;
  price: string;
  mesto_sobitiya: string;
  acters_sostav: boolean;
  seanses: Seanse[];
}

export interface Afisha {
  name: string;
  link: string;
  type_afisha: TypeAfisha;
  id_film: string;
  img_sobitiya: string;
  short_desc: string;
  mobile: string;
  price: string;
  poster: string;
  mesto_sobitiya: string;
  acters_sostav: boolean;
  seanses: Seanse[];
}

export interface Seanse {
  id_session: string;
  city: City;
  type_zal: boolean;
  date: string;
}

export interface TypeAfisha {
  value: Value;
  label: Label;
}

export interface Seanse {
  city: City;
  date: string;
  id_session: string;
}

export enum City {
  Ноябрьск = "Ноябрьск",
  Вынгапур = "Вынгапур",
}

export interface TypeAfisha {
  value: Value;
  label: Label;
}

export enum Label {
  Мероприятие = "Мероприятие",
  Театр = "Театр",
}

export enum Value {
  Mero = "mero",
  Theatre = "theatre",
}
