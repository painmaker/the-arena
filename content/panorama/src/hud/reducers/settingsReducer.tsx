import { SettingsActionTypes, SET_SETTINGS_VISIBLE } from "../types/settingsTypes";

const initialState = {
  visible: 6,
};

export default function(state = initialState, action : SettingsActionTypes) {
  switch (action.type) {
    case SET_SETTINGS_VISIBLE: {
      return {
        ...state,
        zoom: action.payload
      };
    }
    default:
      return state;
  }
}
