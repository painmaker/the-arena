import { MinimapActionTypes, SET_MINIMAP_ZOOM } from "../types/minimapTypes";

const initialState = {
  zoom: 6,
};

export default function(state = initialState, action : MinimapActionTypes) {
  switch (action.type) {
    case SET_MINIMAP_ZOOM: {
      return {
        ...state,
        zoom: action.payload
      };
    }
    default:
      return state;
  }
}
