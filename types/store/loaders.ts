import { AFISHA, THEATRE, REPERTOIRE, CLUBS, NEWS } from "../../constants";

export interface LoadersProps {
  [AFISHA]: boolean;
  [THEATRE]: boolean;
  [REPERTOIRE]: boolean;
  [CLUBS]: boolean;
  [NEWS]: boolean;
}
