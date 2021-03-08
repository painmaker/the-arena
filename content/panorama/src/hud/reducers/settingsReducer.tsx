import { SettingsActionTypes, SET_CAMERA_LOCKED, SET_CAMERA_ZOOM, SET_USE_CUSTOM_UI, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

const initialState = {
  visible: false,
  cameraLocked: true,
  cameraZoom: 1600,
  useCustomUI: true,
};

export default function (state = initialState, action: SettingsActionTypes) {
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
    case SET_USE_CUSTOM_UI: {
      return {
        ...state,
        useCustomUI: action.payload.useCustomUI
      };
    }
    default:
      return state;
  }
}
