import { CharacterPanelActionTypes, SET_CHARACTER_PANEL_VISIBLE } from "../types/characterPanelTypes";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: CharacterPanelActionTypes) {
  switch (action.type) {
    case SET_CHARACTER_PANEL_VISIBLE: {
      return {
        ...state,
        visible: action.payload
      };
    }
    default:
      return state;
  }
}
