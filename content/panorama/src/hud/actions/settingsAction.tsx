import { SettingsActionTypes, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

export function setSettingsVisible(visible: boolean): SettingsActionTypes {
  return {
    type: SET_SETTINGS_VISIBLE,
    payload: visible
  }
}