import { ItemOptionsActionTypes, SET_ITEM_OPTIONS_ITEM, SET_ITEM_OPTIONS_POSITION_X, SET_ITEM_OPTIONS_VISIBLE } from "../interfaces/itemOptionsTypes";

export function setItemOptionsItem(item: ItemEntityIndex): ItemOptionsActionTypes {
  return {
    type: SET_ITEM_OPTIONS_ITEM,
    payload: { item }
  }
}

export function setItemOptionsPositionX(posX: number): ItemOptionsActionTypes {
  return {
    type: SET_ITEM_OPTIONS_POSITION_X,
    payload: { posX }
  }
}

export function setItemOptionsVisible(visible: boolean): ItemOptionsActionTypes {
  return {
    type: SET_ITEM_OPTIONS_VISIBLE,
    payload: { visible }
  }
}
