import { SettingsActionTypes, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

const initialState = {
  visible: false,
};

export default function(state = initialState, action : SettingsActionTypes) {
  switch (action.type) {
    case SET_SETTINGS_VISIBLE: {
      return {
        ...state,
        visible: action.payload
      };
    }
    default:
      return state;
  }
}
