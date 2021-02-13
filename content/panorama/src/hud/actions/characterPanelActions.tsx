import { CharacterPanelActionTypes, SET_CHARACTER_PANEL_VISIBLE } from "../types/characterPanelTypes";

export function setCharacterPanelVisible(visible: boolean): CharacterPanelActionTypes {
  return {
    type: SET_CHARACTER_PANEL_VISIBLE,
    payload: visible
  }
}