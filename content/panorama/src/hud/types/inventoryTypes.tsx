export const ADD_LOCKED_INVENTORY_ITEM = 'ADD_LOCKED_INVENTORY_ITEM'
export const REMOVE_LOCKED_INVENTORY_ITEM = 'REMOVE_LOCKED_INVENTORY_ITEM'
export const RESET_ITEM_OPTIONS = 'RESET_ITEM_OPTIONS'

interface AddLockedInventoryItem {
  type: typeof ADD_LOCKED_INVENTORY_ITEM
  payload: { item: ItemEntityIndex }
}

interface RemoveLockedInventoryItem {
  type: typeof REMOVE_LOCKED_INVENTORY_ITEM
  payload: { item: ItemEntityIndex }
}

export type InventoryActionTypes = AddLockedInventoryItem | RemoveLockedInventoryItem;