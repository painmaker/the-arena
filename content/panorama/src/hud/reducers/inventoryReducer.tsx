import { InventoryActionTypes, SET_INVENTORY_MENU_POSITION } from "../types/inventoryTypes";

const initialState = {
  x: 0,
  y: 0,
};

export default function (state = initialState, action: InventoryActionTypes) {
  switch (action.type) {
    case SET_INVENTORY_MENU_POSITION: {
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y
      };
    }
    default:
      return state;
  }
}
