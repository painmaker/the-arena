export const SET_ITEM_OPTIONS_ITEM = 'SET_ITEM_OPTIONS_ITEM'
export const SET_ITEM_OPTIONS_VISIBLE = 'SET_ITEM_OPTIONS_VISIBLE'

export interface SetItemOptionsItem {
  type: typeof SET_ITEM_OPTIONS_ITEM
  payload: { item: ItemEntityIndex }
}

export interface SetItemOptionsVisible {
  type: typeof SET_ITEM_OPTIONS_VISIBLE
  payload: { visible: boolean }
}

export type ItemOptionsActionTypes = SetItemOptionsItem | SetItemOptionsVisible;