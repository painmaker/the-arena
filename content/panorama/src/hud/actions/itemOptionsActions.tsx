import { ItemOptionsActionTypes, RESET_ITEM_OPTIONS, SET_ITEM_OPTIONS_ITEM, SET_ITEM_OPTIONS_VISIBLE } from "../types/itemOptionsTypes";

export function setItemOptionsItem(item: ItemEntityIndex): ItemOptionsActionTypes {
  return {
    type: SET_ITEM_OPTIONS_ITEM,
    payload: { item }
  }
}

export function setItemOptionsVisible(visible: boolean): ItemOptionsActionTypes {
  return {
    type: SET_ITEM_OPTIONS_VISIBLE,
    payload: { visible }
  }
}

export function resetItemOptions(): ItemOptionsActionTypes {
  return {
    type: RESET_ITEM_OPTIONS,
  }
}