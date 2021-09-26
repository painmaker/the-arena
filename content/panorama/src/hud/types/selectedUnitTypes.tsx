export const SET_SELECTED_UNIT = 'SET_SELECTED_UNIT'

export interface SetSelectedUnitAction {
  type: typeof SET_SELECTED_UNIT
  payload: { selectedUnit: EntityIndex }
}

export type SelectedUnitActionTypes = SetSelectedUnitAction;