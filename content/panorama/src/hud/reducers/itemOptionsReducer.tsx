import { ItemOptionsActionTypes, RESET_ITEM_OPTIONS, SET_ITEM_OPTIONS_ITEM, SET_ITEM_OPTIONS_VISIBLE } from "../types/itemOptionsTypes";

interface ItemMenuState {
  item: ItemEntityIndex,
  visible: boolean,
}

const initialState: ItemMenuState = {
  item: -1 as ItemEntityIndex,
  visible: false,
};

export default function (state = initialState, action: ItemOptionsActionTypes) {
  switch (action.type) {
    case SET_ITEM_OPTIONS_ITEM: {
      return {
        ...state,
        item: action.payload.item,
      };
    }
    case SET_ITEM_OPTIONS_VISIBLE: {
      return {
        ...state,
        visible: action.payload.visible,
      };
    }
    case RESET_ITEM_OPTIONS: {
      return initialState;
    }
    default:
      return state;
  }
}
