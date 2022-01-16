import { User } from "./User";

export type CharRegistration = {
  name: string;
  admin: boolean;
};

export type Char = {
  name: string;
  lvl: number;
  max_shared_lvl: number;
  min_shared_lvl: number;
  online: boolean;
  premium: boolean;
  residence: string;
  sex: "m" | "f";
  voc: "ms" | "ek" | "ed" | "rp";
  user_id: string;
  user: User;
};
