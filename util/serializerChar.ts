import { Char } from "../types/Char";
import { CharDatabase } from "../types/database/Char";

export const serializeChar: (char: Char) => CharDatabase = (char: Char) => ({
  name: char.data.name,
  lvl: char.data.level,
  max_shared_lvl: Math.floor(char.data.level / (2 / 3)),
  min_shared_lvl: Math.floor(char.data.level * (2 / 3)),
  online: char.data.status.includes("offline") ? false : true,
  premium: char.data.account_status.includes("Premium Account") ? true : false,
  residence: char.data.residence,
  sex: char.data.sex.includes("male") ? "m" : "f",
  voc: char.data.vocation.includes("Knight")
    ? "ek"
    : char.data.vocation.includes("Sorcerer")
    ? "ms"
    : char.data.vocation.includes("Druid")
    ? "ed"
    : "rp",
});
