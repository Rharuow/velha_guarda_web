import { CharDatabase } from "./Char";

export interface LoginUser {
  email: string;
  password: string;
  csrfToken?: string;
}

export interface CreateUser extends LoginUser {
  name: string;
  is_admin: boolean;
  is_active: boolean;
  secret: string;
}

export type User = {
  id?: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  chars?: Array<CharDatabase>;
};
