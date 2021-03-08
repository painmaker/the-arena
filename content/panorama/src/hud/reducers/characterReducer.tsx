import { CharacterActionTypes, SET_CHARACTER_VISIBLE } from "../types/characterTypes";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: CharacterActionTypes) {
  switch (action.type) {
    case SET_CHARACTER_VISIBLE: {
      return {
        ...state,
        visible: action.payload.visible
      };
    }
    default:
      return state;
  }
}
