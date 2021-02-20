import { InventoryActionTypes, SET_DRAGGABLE_ITEM_VISIBLE } from "../types/inventoryTypes";
import { } from "../types/settingsTypes";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: InventoryActionTypes) {
  switch (action.type) {
    case SET_DRAGGABLE_ITEM_VISIBLE: {
      return {
        ...state,
        visible: action.payload
      };
    }
    default:
      return state;
  }
}
