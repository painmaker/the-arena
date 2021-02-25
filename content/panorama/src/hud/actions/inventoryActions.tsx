import { ADD_LOCKED_INVENTORY_ITEM, InventoryActionTypes, REMOVE_LOCKED_INVENTORY_ITEM } from "../types/inventoryTypes";

export function addLockedInventoryItem(item: ItemEntityIndex): InventoryActionTypes {
  return {
    type: ADD_LOCKED_INVENTORY_ITEM,
    payload: { item }
  }
}

export function removeLockedInventoryItem(item: ItemEntityIndex): InventoryActionTypes {
  return {
    type: REMOVE_LOCKED_INVENTORY_ITEM,
    payload: { item }
  }
}