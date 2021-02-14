import { SetCharacterPanelVisibleAction, SET_CHARACTER_PANEL_VISIBLE } from "../types/characterPanelTypes";
import { SettingsActionTypes, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

const initialState = {
  visible: false,
  cameraLocked: false,
  cameraZoom: 1600,
};

export default function (state = initialState, action: SettingsActionTypes | SetCharacterPanelVisibleAction) {
  switch (action.type) {
    case SET_SETTINGS_VISIBLE: {
      return {
        ...state,
        visible: action.payload
      };
    }
    case SET_CAMERA_LOCKED: {
      return {
        ...state,
        cameraLocked: action.payload
      };
    }
    case SET_CAMERA_ZOOM: {
      return {
        ...state,
        cameraZoom: action.payload
      };
    }
    case SET_CHARACTER_PANEL_VISIBLE: {
      return {
        ...state,
        visible: false
      };
    }
    default:
      return state;
  }
}
