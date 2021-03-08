import { CharacterActionTypes, SET_CHARACTER_VISIBLE } from "../types/characterTypes";

export function setCharacterVisible(visible: boolean): CharacterActionTypes {
  return {
    type: SET_CHARACTER_VISIBLE,
    payload: { visible }
  }
}