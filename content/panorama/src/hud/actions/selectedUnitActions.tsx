import { SelectedUnitActionTypes, SET_SELECTED_UNIT } from "../types/selectedUnitTypes";

export function setSelectedUnit(selectedUnit: EntityIndex): SelectedUnitActionTypes {
  return {
    type: SET_SELECTED_UNIT,
    payload: { selectedUnit }
  }
}