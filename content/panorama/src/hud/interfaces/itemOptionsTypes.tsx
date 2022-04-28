export const SET_ITEM_OPTIONS_ITEM = 'SET_ITEM_OPTIONS_ITEM'
export const SET_ITEM_OPTIONS_POSITION_X = 'SET_ITEM_OPTIONS_POSITION_X'
export const SET_ITEM_OPTIONS_VISIBLE = 'SET_ITEM_OPTIONS_VISIBLE'

export interface SetItemOptionsItem {
  type: typeof SET_ITEM_OPTIONS_ITEM
  payload: { item: ItemEntityIndex }
}

export interface setItemOptionsPositionX {
  type: typeof SET_ITEM_OPTIONS_POSITION_X
  payload: { posX: number }
}

export interface SetItemOptionsVisible {
  type: typeof SET_ITEM_OPTIONS_VISIBLE
  payload: { visible: boolean }
}

export type ItemOptionsActionTypes = SetItemOptionsItem | SetItemOptionsVisible | setItemOptionsPositionX;