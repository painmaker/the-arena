export const SET_ITEM_OPTIONS_ITEM = 'SET_ITEM_OPTIONS_ITEM'
export const SET_ITEM_OPTIONS_VISIBLE = 'SET_ITEM_OPTIONS_VISIBLE'
export const RESET_ITEM_OPTIONS = 'RESET_ITEM_OPTIONS'

interface SetItemOptionsItem {
  type: typeof SET_ITEM_OPTIONS_ITEM
  payload: { item: ItemEntityIndex }
}

interface SetItemOptionsVisible {
  type: typeof SET_ITEM_OPTIONS_VISIBLE
  payload: { visible: boolean }
}

interface ResetItemOptions {
  type: typeof RESET_ITEM_OPTIONS
}

export type ItemOptionsActionTypes = SetItemOptionsItem | SetItemOptionsVisible | ResetItemOptions;