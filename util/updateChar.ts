import { updateChar } from "../services/api";
import { CharDatabase } from "../types/database/Char";

export const handleUpdateChar = async (
  char: CharDatabase,
  newChar: CharDatabase
) => {
  if (
    char.name !== newChar.name ||
    char.lvl !== newChar.lvl ||
    char.residence !== newChar.residence ||
    char.online !== newChar.online ||
    char.sex !== newChar.sex ||
    char.premium !== newChar.premium
  ) {
    try {
      char.id && (await updateChar(char.id, newChar));
      return true;
    } catch (error) {
      throw new Error(` handle update char = ${error}`);
    }
  }
  return false;
};
