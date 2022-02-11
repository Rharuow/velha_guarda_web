import { User } from "./User";

export type CharRegistration = {
  name: string;
  admin: boolean;
};

export type CharSex = "m" | "f";

export type CharVoc = "ms" | "ek" | "ed" | "rp";

export interface CharUpdateParamsDatabase {
  name: string;
  lvl: number;
  online: boolean;
  premium: boolean;
  residence: string;
  max_shared_lvl: number;
  min_shared_lvl: number;
  sex: CharSex;
}

export type CharDatabase = {
  id?: string;
  name: string;
  lvl: number;
  max_shared_lvl: number;
  min_shared_lvl: number;
  online: boolean;
  premium: boolean;
  residence: string;
  sex: CharSex;
  voc: CharVoc;
  user_id?: string;
  user?: User;
};
