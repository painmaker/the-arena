export const SET_INVENTORY_MENU_POSITION = 'SET_INVENTORY_MENU_POSITION'

interface SetInventoryMenuPosition {
  type: typeof SET_INVENTORY_MENU_POSITION
  payload: { x: number, y: number }
}

export type InventoryActionTypes = SetInventoryMenuPosition;