export const SET_DRAGGABLE_ITEM_VISIBLE = 'SET_DRAGGABLE_ITEM_VISIBLE'

export interface SetDraggableItemVisibleAction {
  type: typeof SET_DRAGGABLE_ITEM_VISIBLE
  payload: boolean
}

export type InventoryActionTypes = SetDraggableItemVisibleAction; 