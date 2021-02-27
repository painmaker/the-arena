import { SettingsActionTypes, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM, SET_SETTINGS_VISIBLE, SET_USE_CUSTOM_UI } from "../types/settingsTypes";

export function setSettingsVisible(visible: boolean): SettingsActionTypes {
  return {
    type: SET_SETTINGS_VISIBLE,
    payload: visible
  }
}

export function setCameraLocked(locked: boolean): SettingsActionTypes {
  return {
    type: SET_CAMERA_LOCKED,
    payload: locked
  }
}

export function setCameraZoom(zoom: number): SettingsActionTypes {
  return {
    type: SET_CAMERA_ZOOM,
    payload: zoom
  }
}

export function setUseCustomUI(useCustomUI: boolean): SettingsActionTypes {
  return {
    type: SET_USE_CUSTOM_UI,
    payload: { useCustomUI }
  }
}
