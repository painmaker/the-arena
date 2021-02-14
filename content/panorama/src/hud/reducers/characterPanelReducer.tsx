import { CharacterPanelActionTypes, SET_CHARACTER_PANEL_VISIBLE } from "../types/characterPanelTypes";
import { SetSettingsVisibleAction, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: CharacterPanelActionTypes | SetSettingsVisibleAction) {
  switch (action.type) {
    case SET_CHARACTER_PANEL_VISIBLE: {
      return {
        ...state,
        visible: action.payload
      };
    }
    case SET_SETTINGS_VISIBLE: {
      return {
        ...state,
        visible: false
      };
    }
    default:
      return state;
  }
}
