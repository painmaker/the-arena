import { SettingsActionTypes, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

export function setDraggableItemVisible(visible: boolean): SettingsActionTypes {
  return {
    type: SET_SETTINGS_VISIBLE,
    payload: visible
  }
}
