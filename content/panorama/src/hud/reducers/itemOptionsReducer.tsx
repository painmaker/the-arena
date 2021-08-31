import { ItemOptionsActionTypes, SET_ITEM_OPTIONS_ITEM, SET_ITEM_OPTIONS_POSITION_X, SET_ITEM_OPTIONS_VISIBLE } from "../types/itemOptionsTypes";

interface ItemMenuState {
  item: ItemEntityIndex,
  visible: boolean,
  posX: number,
}

const initialState: ItemMenuState = {
  item: -1 as ItemEntityIndex,
  visible: false,
  posX: 0,
};

export default function (state = initialState, action: ItemOptionsActionTypes): ItemMenuState {
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
    case SET_ITEM_OPTIONS_POSITION_X: {
      return {
        ...state,
        posX: action.payload.posX,
      };
    }
    default:
      return state;
  }
}
