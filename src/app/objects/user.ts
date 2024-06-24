
import { Aumentador } from "./aumentar";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  level: number;
  aumentador?: Aumentador[];
  obreros: number;
}
