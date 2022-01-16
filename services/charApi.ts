import axios from "axios";
import { Char } from "../types/Char";
import { Guild } from "../types/Guild";

const charApi = axios.create({
  baseURL: "https://api.tibiadata.com/v2",
});

const getChar: (name: string) => Promise<Char> = async (name: string) =>
  (await charApi.get(`/characters/${name}.json`)).data.characters as Char;

const getGuild: () => Promise<Guild> = async () =>
  (await charApi.get("/guild/velha+guarda.json")).data as Guild;

export { charApi, getChar, getGuild };
