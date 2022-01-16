import axios from "axios";
import { Guild } from "../types/Guild";

const charApi = axios.create({
  baseURL: "https://api.tibiadata.com/v2",
});

const getChar = async (name: string) =>
  await charApi.get(`/characters/${name}.json`);

const getGuild = async () =>
  (await charApi.get("/guild/velha+guarda.json")).data as Guild;

export { charApi, getChar, getGuild };
