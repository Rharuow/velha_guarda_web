import { CharDatabase } from "./Char";

export type User = {
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  chars?: Array<CharDatabase>;
};

export type CreateUser = {
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  password: string;
  secret: string;
  chars: Array<CharDatabase>;
};
