import { Char } from "../types/Char";
import { CharDatabase } from "../types/database/Char";

export const serializeChar: (char: Char) => CharDatabase = ({
  character,
  other_characters,
}: Char) => ({
  name: character.name,
  lvl: character.level,
  max_shared_lvl: Math.floor(character.level / (2 / 3)),
  min_shared_lvl: Math.floor(character.level * (2 / 3)),
  online: other_characters
    .find((char) => char.name === character.name)
    ?.status.includes("offline")
    ? false
    : true,
  premium: character.account_status.includes("Premium Account") ? true : false,
  residence: character.residence,
  sex: character.sex === "male" ? "m" : "f",
  voc: character.vocation.includes("Knight")
    ? "ek"
    : character.vocation.includes("Sorcerer")
    ? "ms"
    : character.vocation.includes("Druid")
    ? "ed"
    : "rp",
});
