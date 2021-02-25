import { ADD_LOCKED_INVENTORY_ITEM, InventoryActionTypes, REMOVE_LOCKED_INVENTORY_ITEM } from "../types/inventoryTypes";

interface IventoryState {
  lockedItems: ItemEntityIndex[],
}

const initialState: IventoryState = {
  lockedItems: [],
};

export default function (state = initialState, action: InventoryActionTypes) {
  switch (action.type) {
    case ADD_LOCKED_INVENTORY_ITEM: {
      return {
        ...state,
        lockedItems: state.lockedItems.concat(action.payload.item),
      };
    }
    case REMOVE_LOCKED_INVENTORY_ITEM: {
      return {
        ...state,
        lockedItems: state.lockedItems.filter(item => item !== action.payload.item),
      };
    }
    default:
      return state;
  }
} 
