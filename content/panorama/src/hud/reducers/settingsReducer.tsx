import { SetCharacterPanelVisibleAction, SET_CHARACTER_PANEL_VISIBLE } from "../types/characterPanelTypes";
import { SettingsActionTypes, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: SettingsActionTypes | SetCharacterPanelVisibleAction) {
  switch (action.type) {
    case SET_SETTINGS_VISIBLE: {
      return {
        ...state,
        visible: action.payload
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
