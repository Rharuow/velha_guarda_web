import axios from "axios";
import { Char } from "../types/Char";
import { Guild } from "../types/Guild";
import { setError } from "./api";

const charApi = axios.create({
  baseURL: "https://api.tibiadata.com/v3",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ErrorAPI = {
  config: {};
  data: {};
  headers: {};
  status: number;
  statusText: string;
};

const getChar: (name: string) => Promise<Char> = async (name: string) => {
  try {
    const char = (await charApi.get(`/character/${name}`)).data
      .characters as Char;
    return char;
  } catch (error) {
    throw new Error(`error = ${error}`);
  }
};
const getGuild: () => Promise<Guild> = async () =>
  (await charApi.get("/guild/velha+guarda.json")).data as Guild;

export { charApi, getChar, getGuild };
