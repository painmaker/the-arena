import { InventoryActionTypes, SET_INVENTORY_MENU_POSITION } from "../types/inventoryTypes";

export function setInventoryMenuPosition(x: number, y: number): InventoryActionTypes {
  return {
    type: SET_INVENTORY_MENU_POSITION,
    payload: { x, y }
  }
}